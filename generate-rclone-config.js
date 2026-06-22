#!/usr/bin/env node

/**
 * Generate rclone.conf from environment variables
 * This allows us to deploy to Hugging Face without committing sensitive credentials
 */

const fs = require('fs');
const path = require('path');

// Default values (can be overridden by environment variables)
const config = {
    // Terabox WebDAV config
    terabox_url: process.env.TERABOX_WEBDAV_URL || 'http://localhost:5244/dav/terabox',
    terabox_user: process.env.TERABOX_USER || 'admin',
    terabox_pass: process.env.TERABOX_PASS || 'jQWUqfvMZ6pXuG8G4epx4upNt6M-Soje9zIJZBecww',
    
    // Terabox Crypt config
    terabox_crypt_password: process.env.TERABOX_CRYPT_PASSWORD || 'uR-oRsbNnnKcfycXNO_4o4i5luHbnE-ncDCN3JaRvC4',
    
    // Storj S3 config
    storj_access_key: process.env.STORJ_ACCESS_KEY || 'dummy',
    storj_secret_key: process.env.STORJ_SECRET_KEY || 'dummy',
    storj_endpoint: process.env.STORJ_ENDPOINT || 'https://gateway.storjshare.io'
};

// Generate rclone.conf content
const rcloneConfig = `[terabox]
type = webdav
url = ${config.terabox_url}
vendor = other
user = ${config.terabox_user}
pass = ${config.terabox_pass}

[terabox_crypt]
type = crypt
remote = terabox:/arsip_encrypted
filename_encryption = standard
directory_name_encryption = true
password = ${config.terabox_crypt_password}

[storj]
type = s3
provider = other
env_auth = false
access_key_id = ${config.storj_access_key}
secret_access_key = ${config.storj_secret_key}
endpoint = ${config.storj_endpoint}
`;

// Write to file
const configPath = path.join(__dirname, 'rclone.conf');
fs.writeFileSync(configPath, rcloneConfig, 'utf8');

console.log('[RcloneConfig] Generated rclone.conf from environment variables');
console.log(`[RcloneConfig] Terabox URL: ${config.terabox_url}`);
console.log(`[RcloneConfig] Terabox User: ${config.terabox_user}`);
console.log(`[RcloneConfig] Storj Endpoint: ${config.storj_endpoint}`);
console.log(`[RcloneConfig] Config written to: ${configPath}`);
