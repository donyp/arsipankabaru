# 🤗 Hugging Face Spaces - Complete Setup Guide

## Prerequisites

Before starting, gather these from previous deployment:

1. **Supabase Credentials**
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY

2. **JWT Secret**
   - JWT_SECRET (any random string, minimum 32 characters)

3. **Terabox WebDAV Credentials**
   - Terabox username
   - Terabox password
   - (Optional) Crypt password if encrypted

4. **GitHub Account** (optional, for easier updates)

---

## 📋 STEP 1: Create Hugging Face Account

1. Go to https://huggingface.co
2. Click "Sign Up"
3. Enter email, password
4. Verify email
5. Complete profile

---

## 📋 STEP 2: Create New Space

1. **Go to**: https://huggingface.co/new-space
2. **Fill form**:
   - **Space name**: `arsip-anka` (or your choice)
   - **License**: OpenRAIL (default)
   - **Space SDK**: Docker
   - **Visibility**: Public
3. **Click**: "Create Space"

**Result**: You now have empty space at:
```
https://huggingface.co/spaces/[your-username]/arsip-anka
```

---

## 📋 STEP 3: Connect GitHub Repository

### Option A: Push from GitHub (Recommended)

1. **Go to Space Settings** (gear icon)
2. **Repository tab**
3. **Link Repository**: 
   ```
   https://github.com/donyp/arsipankabaru.git
   ```
4. **Click** "Link Repository"

Now any push to main branch auto-deploys!

### Option B: Manual Upload

1. **Go to Files tab** in Space
2. **Upload files** from local machine
3. Less automated, manual each time

---

## 📋 STEP 4: Add Environment Variables/Secrets

1. **Go to Space Settings** (⚙️ icon)
2. **Click**: "Repository secrets"
3. **Add each secret** (click "New secret"):

### Required Secrets:

```
Name: SUPABASE_URL
Value: [your-supabase-url-from-previous-deployment]
```

```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: [your-service-role-key]
```

```
Name: JWT_SECRET
Value: [your-jwt-secret, any random string 32+ chars]
Example: super-secret-key-minimum-32-characters-long-string
```

```
Name: TERABOX_WEBDAV_URL
Value: https://pan.baidu.com/api/publicweb/terabox.php
```

```
Name: TERABOX_USER
Value: [your-terabox-username/email]
```

```
Name: TERABOX_PASS
Value: [your-terabox-password]
```

### Optional Secrets:

```
Name: TERABOX_CRYPT_PASSWORD
Value: [your-encryption-password if using encrypted Terabox]
```

```
Name: STORJ_ACCESS_KEY
Value: [optional Storj integration key]
```

---

## 📋 STEP 5: Wait for Build & Deploy

1. **Go to Build Logs**
   - Click "Build" or view existing build
   - Watch for:
     ```
     ✓ Docker image built successfully
     ✓ Container started
     ```

2. **Check Status**:
   - Green ✅ = Running successfully
   - Red ❌ = Build failed, check logs
   - Orange ⏳ = Building...

3. **Wait ~3-5 minutes** for initial build

---

## 📋 STEP 6: Access Your App

Once deployed (green status):

1. **Go to Space URL**: 
   ```
   https://huggingface.co/spaces/[username]/arsip-anka
   ```

2. **App embedded** in page (or click external link)

3. **First load** might be slow (cold start ~5-10sec)

4. **Wait for**: "Pusat Arsip Anka" header to appear

---

## ✅ VERIFICATION CHECKLIST

After deployment, verify everything works:

### ☑️ 1. Check Health
```
1. Open app URL
2. Should see login page
3. Page loads in <30 seconds
```

### ☑️ 2. Check Backend Logs
```
1. Go to Space Settings
2. Click "Logs"
3. Should see:
   - "Starting Pusat Arsip Anka"
   - "Node.js backend server listening"
   - No error messages
```

### ☑️ 3. Test Login
```
1. Use admin credentials from database
2. Should successfully login
3. Should redirect to dashboard
```

### ☑️ 4. Test File Upload
```
1. Upload test file via UI
2. Should complete within 30 seconds
3. Check: File appears in file list
4. Check logs for no errors
```

### ☑️ 5. Test Terabox Sync
```
1. Check backend logs
2. Should see: "[Background Upload] SUCCESS for [filename]"
3. Check Terabox account - file should appear within 2 minutes
```

### ☑️ 6. Test Persistence
```
1. Re-run Space (gear → rebuild)
2. After restart, files should still be there
3. No "file not found" errors
```

---

## ⚠️ IMPORTANT CONSIDERATIONS

### Storage Management
- Hugging Face provides **50GB** storage
- Your files go to `/app/data/files/` (counts toward 50GB)
- Keep eye on storage usage:
  - Go to Space Settings → Storage
  - If near 50GB, archive old files or upgrade to VPS

### Automatic Sleeps
- Space sleeps after **48 hours of no traffic**
- App auto-wakes when someone accesses it
- ~10-30 second delay to wake (cold start)
- This is normal and expected

### Performance
- Slower than dedicated VPS (shared CPU)
- Fine for small team testing
- Not suitable for high-traffic production
- Memory: ~512MB available (adequate)

### Restarts
- Space can restart without warning
- Your database connection might drop temporarily
- Retry logic should handle this
- Check logs if strange errors appear

---

## 🔧 TROUBLESHOOTING

### Problem: "Build failed"

**Solution**:
1. Check build logs (click "Build" tab)
2. Look for error messages
3. Common issues:
   - `npm install` failed → Check package.json dependencies
   - `PORT env var not found` → Add PORT=7860 in secrets
   - Missing env vars → Add all required secrets

### Problem: App won't start / blank page

**Solution**:
1. Check logs (Settings → Logs)
2. Look for:
   ```
   Error: Cannot find module [name]
   Error: ENOENT: no such file or directory
   Error: connect ECONNREFUSED (database issue)
   ```
3. Common fixes:
   - Verify all secrets are set correctly
   - Check Supabase is running
   - Verify credentials are exact (copy-paste, no extra spaces)

### Problem: "Terabox authentication failed"

**Solution**:
1. Check logs for: `401 Unauthorized`
2. Verify Terabox credentials:
   - Username/email correct?
   - Password correct?
   - Account not locked?
   - 2FA enabled? (might block connections)
3. Test credentials locally first

### Problem: Files not syncing to Terabox

**Solution**:
1. Check logs for: `[Background Upload]` messages
2. Look for errors like:
   ```
   gzip: invalid header
   permission denied
   timeout
   ```
3. Common fixes:
   - Check Terabox has space available
   - Verify Rclone WebDAV config in logs
   - Check file permissions in `/app/data/files/`

### Problem: "Storage full" error

**Solution**:
1. Check Space Storage in Settings
2. Options:
   a) Delete old uploaded files
   b) Archive to Terabox and delete local copies
   c) Upgrade to VPS with more storage
3. Monitor regularly: `Settings → Storage`

### Problem: App sleeps after 48 hours

**Expected behavior!** But if annoying:
1. Keep it "warm" by accessing daily
2. Or upgrade to VPS (always running)
3. Or use GitHub Actions to ping endpoint every hour

---

## 📊 MONITORING

### Check Logs Regularly

```
Go to Space → Logs
Look for:
✅ "Node.js backend server listening"
✅ "[Background Upload] SUCCESS"
❌ "Error", "Failed", "Connection refused"
```

### Monitor Storage Usage

```
Go to Space Settings → Storage
- Current usage vs 50GB limit
- If >80%, start cleaning up
```

### Monitor Performance

```
If slow loads:
- Check CPU usage (unlikely on HF)
- Check for errors in logs
- Consider VPS migration
```

---

## 🚀 NEXT STEPS

### Week 1: Testing
- ✅ Verify all features work
- ✅ Upload test files
- ✅ Check Terabox sync
- ✅ Monitor logs for errors

### Week 2-4: Production Testing
- ✅ Real users testing
- ✅ Load testing
- ✅ Monitor storage usage
- ✅ Check performance

### After 1 Month: Upgrade Decision
- **Stay on HF Spaces**: If working fine, no changes needed
- **Upgrade to VPS**: If want always-on, better performance
- **Upgrade to Cloud Run**: If want full enterprise features

---

## 📞 SUPPORT

### Documentation
- Space README: In your Space (HF_SPACES_README.md)
- GitHub Issues: https://github.com/donyp/arsipankabaru/issues
- Hugging Face Docs: https://huggingface.co/docs/hub/spaces

### Getting Help
1. **Check logs first** (always!)
2. **Search GitHub issues** (might be known problem)
3. **Post GitHub issue** with:
   - What you tried
   - Error message from logs
   - Steps to reproduce

---

## ✨ SUMMARY

**Time to Deploy**: ~10 minutes
**Downtime**: None (first-time setup)
**Cost**: FREE
**Suitable for**: Testing, small team, proof of concept

**Next**: Login to your app and start testing!

---

**Created**: 2024
**Version**: 1.0
