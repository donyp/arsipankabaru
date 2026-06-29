#!/usr/bin/env node

/**
 * Sync Terabox Files to Database
 * 
 * This script scans all files in Terabox via Rclone and inserts them into Supabase database.
 * Use this to restore database after migration or to import existing Terabox files.
 * 
 * Usage:
 *   node backend/sync-terabox-to-db.js
 * 
 * Environment variables required:
 *   - SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 */

require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const { createClient } = require('@supabase/supabase-js');
const { execFile } = require('child_process');
const path = require('path');

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * List all files from Terabox using rclone
 */
async function listTeraboxFiles() {
    return new Promise((resolve, reject) => {
        const configPath = path.join(__dirname, '..', 'rclone.conf');
        
        console.log('[Sync] Scanning Terabox files via rclone...');
        console.log(`[Sync] Config: ${configPath}`);
        
        execFile('rclone', [
            '--config', configPath,
            'lsjson',
            'terabox_direct:/',
            '--recursive'
        ], { maxBuffer: 50 * 1024 * 1024 }, (error, stdout, stderr) => {
            if (error) {
                console.error('[Sync] ❌ Failed to list Terabox files');
                console.error('[Sync] Error:', error.message);
                console.error('[Sync] Stderr:', stderr);
                return reject(error);
            }
            
            try {
                const files = JSON.parse(stdout);
                console.log(`[Sync] ✅ Found ${files.length} files in Terabox`);
                resolve(files);
            } catch (err) {
                console.error('[Sync] ❌ Failed to parse rclone output');
                reject(err);
            }
        });
    });
}

/**
 * Extract metadata from filename
 * Expected format: zona{N}_{filename}
 */
function extractMetadata(filePath) {
    const fileName = path.basename(filePath);
    const match = fileName.match(/^zona(\d+[AB]?)_(.+)$/i);
    
    if (match) {
        return {
            zona: match[1].toUpperCase(),
            originalName: match[2]
        };
    }
    
    // If no zona prefix, return defaults
    return {
        zona: null,
        originalName: fileName
    };
}

/**
 * Get or create default admin user
 */
async function getAdminUser() {
    // Try to find existing admin user
    const { data: users, error } = await supabase
        .from('users')
        .select('id')
        .eq('role', 'admin')
        .limit(1);
    
    if (error) {
        console.error('[Sync] ❌ Failed to query users:', error.message);
        throw error;
    }
    
    if (users && users.length > 0) {
        console.log(`[Sync] Using existing admin user: ${users[0].id}`);
        return users[0].id;
    }
    
    // Create default admin user if none exists
    console.log('[Sync] Creating default admin user...');
    const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
            username: 'admin',
            password_hash: '$2a$10$dummyhashforsynconlypurpose', // Placeholder
            role: 'admin'
        })
        .select()
        .single();
    
    if (createError) {
        console.error('[Sync] ❌ Failed to create admin user:', createError.message);
        throw createError;
    }
    
    console.log(`[Sync] ✅ Created admin user: ${newUser.id}`);
    return newUser.id;
}

/**
 * Insert file into database
 */
async function insertFile(file, userId) {
    const metadata = extractMetadata(file.Path);
    
    const fileRecord = {
        user_id: userId,
        file_name: metadata.originalName,
        file_path: file.Path,
        file_size: file.Size,
        mime_type: file.MimeType || 'application/octet-stream',
        zona_id: metadata.zona,
        storage_location: 'terabox',
        uploaded_at: file.ModTime || new Date().toISOString(),
        is_active: true
    };
    
    const { data, error } = await supabase
        .from('media')
        .insert(fileRecord)
        .select()
        .single();
    
    if (error) {
        // Check if duplicate
        if (error.code === '23505') {
            console.log(`[Sync] ⚠️  Skipped duplicate: ${file.Path}`);
            return { skipped: true };
        }
        
        console.error(`[Sync] ❌ Failed to insert: ${file.Path}`);
        console.error('[Sync] Error:', error.message);
        return { error };
    }
    
    return { success: true, data };
}

/**
 * Main sync function
 */
async function syncFiles() {
    console.log('================================================');
    console.log('[Sync] 🔄 Terabox to Database Sync');
    console.log('[Sync] Time:', new Date().toISOString());
    console.log('================================================\n');
    
    try {
        // Step 1: Get admin user
        console.log('[Step 1] Getting admin user...');
        const userId = await getAdminUser();
        console.log('[Step 1] ✅ Complete\n');
        
        // Step 2: List Terabox files
        console.log('[Step 2] Listing Terabox files...');
        const files = await listTeraboxFiles();
        
        // Filter out directories (only files)
        const fileList = files.filter(f => !f.IsDir);
        console.log(`[Step 2] Found ${fileList.length} files (${files.length - fileList.length} directories skipped)`);
        console.log('[Step 2] ✅ Complete\n');
        
        if (fileList.length === 0) {
            console.log('[Sync] ⚠️  No files found in Terabox');
            console.log('[Sync] Complete with 0 files synced');
            return;
        }
        
        // Step 3: Insert files into database
        console.log('[Step 3] Inserting files into database...');
        let inserted = 0;
        let skipped = 0;
        let failed = 0;
        
        for (const file of fileList) {
            const result = await insertFile(file, userId);
            
            if (result.success) {
                inserted++;
                if (inserted % 10 === 0) {
                    console.log(`[Sync] Progress: ${inserted}/${fileList.length} inserted...`);
                }
            } else if (result.skipped) {
                skipped++;
            } else {
                failed++;
            }
        }
        
        console.log('[Step 3] ✅ Complete\n');
        
        // Summary
        console.log('================================================');
        console.log('[Sync] ✅ SYNC COMPLETE');
        console.log('================================================');
        console.log(`Total files in Terabox: ${fileList.length}`);
        console.log(`✅ Inserted: ${inserted}`);
        console.log(`⚠️  Skipped (duplicates): ${skipped}`);
        console.log(`❌ Failed: ${failed}`);
        console.log('================================================\n');
        
        if (failed > 0) {
            console.log('⚠️  Some files failed to sync. Check logs above for details.');
            process.exit(1);
        }
        
    } catch (err) {
        console.error('\n[Sync] ❌ SYNC FAILED');
        console.error('[Sync] Error:', err.message);
        console.error('[Sync] Stack:', err.stack);
        process.exit(1);
    }
}

// Run sync
if (require.main === module) {
    syncFiles()
        .then(() => {
            console.log('[Sync] Exiting...');
            process.exit(0);
        })
        .catch(err => {
            console.error('[Sync] Fatal error:', err);
            process.exit(1);
        });
}

module.exports = { syncFiles, listTeraboxFiles };
