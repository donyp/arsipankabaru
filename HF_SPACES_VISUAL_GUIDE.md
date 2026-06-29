# 🤗 Hugging Face Spaces - Visual Step-by-Step Guide

## STEP 1️⃣: CREATE HUGGING FACE ACCOUNT

### Screen 1: Sign Up
```
┌─────────────────────────────────────┐
│  Hugging Face - Sign Up             │
│                                     │
│  Email: your-email@gmail.com        │
│  Password: ••••••••••••••           │
│                                     │
│  [Create Account]                   │
└─────────────────────────────────────┘
```

### Expected Result
✅ Account created  
✅ Email verified  
✅ Ready to create Space  

---

## STEP 2️⃣: CREATE NEW SPACE

### Navigate to New Space
```
URL: https://huggingface.co/new-space
```

### Fill Space Creation Form
```
┌─────────────────────────────────────┐
│  Create New Space                   │
├─────────────────────────────────────┤
│                                     │
│  Space name:                        │
│  [arsip-anka          ↓]            │
│                                     │
│  Space SDK:                         │
│  [Docker              ↓]   ← SELECT │
│                                     │
│  License:                           │
│  [OpenRAIL            ↓]            │
│                                     │
│  Visibility:                        │
│  ◉ Public                           │
│  ○ Private                          │
│                                     │
│           [Create Space]            │
└─────────────────────────────────────┘
```

### Expected Result
✅ Space created  
✅ URL: `https://huggingface.co/spaces/[your-user]/arsip-anka`  
✅ Empty Space ready for files  

---

## STEP 3️⃣: LINK GITHUB REPOSITORY

### Navigate to Space Settings
```
Your Space URL:
https://huggingface.co/spaces/[your-user]/arsip-anka
                                          ↓
                                    [⚙️ Settings]
```

### Click Repository Tab
```
┌─────────────────────────────────────┐
│  Space Settings                     │
├─────────────────────────────────────┤
│                                     │
│  Tabs:                              │
│  [ Basic ] [Repository] [Secrets] ← │
│                                     │
│  Link Repository:                   │
│  [ ] Linked                         │
│                                     │
│  Repository URL:                    │
│  [Link your repo]                   │
│                                     │
│  [Connect Repository]               │
└─────────────────────────────────────┘
```

### Enter Repository URL
```
Repository URL:
https://github.com/donyp/arsipankabaru.git

[Link Repository]
```

### Expected Result
✅ Repository linked  
✅ Files synced from GitHub  
✅ Auto-deploy enabled on git push  

---

## STEP 4️⃣: ADD ENVIRONMENT SECRETS

### Navigate to Secrets Tab
```
Space Settings → Secrets Tab

┌─────────────────────────────────────┐
│  Repository Secrets                 │
├─────────────────────────────────────┤
│                                     │
│  [New Secret]                       │
│                                     │
│  Secrets:                           │
│  (List will fill as you add)         │
│                                     │
└─────────────────────────────────────┘
```

### Add Each Secret (Click "New Secret" each time)

#### Secret 1: SUPABASE_URL
```
┌─────────────────────────────────────┐
│  Create New Secret                  │
├─────────────────────────────────────┤
│                                     │
│  Name: SUPABASE_URL                 │
│  Value: https://ehdqcxz...          │
│                                     │
│  [Create Secret]                    │
└─────────────────────────────────────┘
```

#### Secret 2: SUPABASE_SERVICE_ROLE_KEY
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiI...
```

#### Secret 3: JWT_SECRET
```
Name: JWT_SECRET
Value: my-super-secret-32-char-minimum-string-here
```

#### Secret 4: TERABOX_WEBDAV_URL
```
Name: TERABOX_WEBDAV_URL
Value: https://pan.baidu.com/api/publicweb/terabox.php
```

#### Secret 5: TERABOX_USER
```
Name: TERABOX_USER
Value: your-terabox-username@gmail.com
```

#### Secret 6: TERABOX_PASS
```
Name: TERABOX_PASS
Value: your-terabox-password-here
```

### After Adding All Secrets
```
┌─────────────────────────────────────┐
│  Repository Secrets                 │
├─────────────────────────────────────┤
│                                     │
│  ✓ SUPABASE_URL          [🔐Hide] [🗑️]
│  ✓ SUPABASE_SERVICE_ROLE_KEY  [🔐] [🗑️]
│  ✓ JWT_SECRET            [🔐] [🗑️]
│  ✓ TERABOX_WEBDAV_URL    [🔐] [🗑️]
│  ✓ TERABOX_USER          [🔐] [🗑️]
│  ✓ TERABOX_PASS          [🔐] [🗑️]
│                                     │
└─────────────────────────────────────┘
```

### Expected Result
✅ All 6 secrets added  
✅ Status shows ✓ for each  
✅ Ready for deployment  

---

## STEP 5️⃣: WAIT FOR BUILD

### Check Build Status
```
Space page shows:

Status: ⏳ Building...

Build Log:
```
Building Docker image...
Installing dependencies...
npm install completed
Docker image built: 100MB
Container starting...
✓ Build successful!
```

### Building Phase
```
Timeline:
├─ 0-30 seconds: Docker image building
├─ 30-180 seconds: npm install (dependencies)
├─ 180-300 seconds: Container startup
└─ 300+ seconds: Ready to access (green ✅)

Total: ~5 minutes
```

### Build Complete
```
Space page shows:

Status: ✅ RUNNING (green)

You can now access your app!
```

### Expected Result
✅ Status is green (✅)  
✅ Build completed without errors  
✅ App is running  

---

## STEP 6️⃣: ACCESS YOUR APP

### Click App Link
```
Space page shows:

Embedded App (or click external link):
┌─────────────────────────────────────┐
│  [⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜]  Loading...     │
│                                     │
│  (App loads here)                   │
│                                     │
└─────────────────────────────────────┘

External link:
🔗 https://huggingface.co/spaces/[user]/arsip-anka
```

### Wait for First Load
```
⏳ Loading... (takes 5-10 seconds on first load)

Then you'll see:

┌─────────────────────────────────────┐
│  🏢 Pusat Arsip Anka                │
├─────────────────────────────────────┤
│                                     │
│  Username: [____________]           │
│  Password: [____________]           │
│                                     │
│           [Login]                   │
│                                     │
└─────────────────────────────────────┘
```

### Expected Result
✅ Login page loads  
✅ Page loads in <30 seconds  
✅ No error messages  

---

## STEP 7️⃣: TEST LOGIN

### Enter Credentials
```
Use admin account:

Username: admin
Password: [your-admin-password]

[Login]
```

### After Login
```
┌─────────────────────────────────────┐
│  🏢 Pusat Arsip Anka                │
├─────────────────────────────────────┤
│  Welcome, Admin!                    │
│                                     │
│  Dashboard:                         │
│  Files: 0                           │
│  Storage: 0 GB                      │
│                                     │
│  [Upload File] [Browse] [Settings]  │
│                                     │
└─────────────────────────────────────┘
```

### Expected Result
✅ Login succeeds  
✅ Dashboard loads  
✅ No authentication errors  

---

## STEP 8️⃣: TEST FILE UPLOAD

### Upload a Test File
```
Click: [Upload File]

Select: test.pdf (or any small file)

System shows:
┌─────────────────────────────────────┐
│  Uploading test.pdf...              │
│  [████████░░░░░░░░░░░░] 50%         │
│                                     │
│  Uploading to: Local Storage         │
│  ⏳ Please wait...                    │
│                                     │
└─────────────────────────────────────┘
```

### Upload Completes
```
Success message:

┌─────────────────────────────────────┐
│  ✅ File uploaded successfully!     │
│                                     │
│  File: test.pdf                     │
│  Size: 125 KB                       │
│  Uploaded: Just now                 │
│                                     │
│  Starting sync to Terabox...        │
│                                     │
└─────────────────────────────────────┘
```

### Expected Result
✅ Upload completes in <30 seconds  
✅ File appears in file list  
✅ No upload errors  

---

## STEP 9️⃣: VERIFY SYNC TO TERABOX

### Check Application Logs
```
Space page → [Logs] tab

Logs should show:

[INIT] Starting Pusat Arsip Anka
[INIT] PORT is set to: 7860
[INIT] Generating rclone.conf
[SERVER] Listening on port 7860
[UPLOAD] File received: test.pdf
[BACKGROUND] Starting sync to Terabox...
[RCLONE] Connecting to Terabox WebDAV
[RCLONE] Authentication: OK
[BACKGROUND] SUCCESS for test.pdf
```

### Expected Result
✅ Logs show "SUCCESS" message  
✅ No error messages  
✅ Sync completed within 2 minutes  

### Verify in Terabox
```
1. Login to Terabox.com
2. Look for: test.pdf
3. Should appear in root or arsip folder
4. File accessible
```

### Expected Result
✅ File visible in Terabox account  
✅ File is accessible  

---

## 🎉 SETUP COMPLETE!

### Verification Checklist
```
✅ Space created on Hugging Face
✅ GitHub repository linked
✅ Environment secrets added
✅ Docker build successful (green status)
✅ App loads in browser
✅ Login works
✅ File upload works
✅ File syncs to Terabox
✅ Logs show no errors
```

---

## 📊 MONITORING DASHBOARD

After deployment, regularly check:

### Daily Check (2 min)
```
1. Go to: https://huggingface.co/spaces/[user]/arsip-anka
2. Check: Status is green ✅
3. Click: Logs tab
4. Verify: No error messages
```

### Weekly Check (10 min)
```
1. Repeat daily check
2. Test: Upload file
3. Check: Terabox sync works
4. Monitor: Storage usage
```

### Space Health Status
```
Status Meanings:

✅ GREEN = Running normally
⏳ ORANGE = Building/restarting
❌ RED = Error (check logs)
⏸️ GRAY = Paused (click to resume)

Your goal: Keep it GREEN!
```

---

## 🆘 COMMON ISSUES & FIXES

### Issue: Build Failed (Red Status)
```
❌ Status: FAILED

Fix:
1. Click [Build] tab
2. Look for error message
3. Check npm install succeeded
4. Verify all secrets are set

Common: Missing environment variable
Solution: Add missing secret, rebuild
```

### Issue: App Won't Load (Blank Page)
```
❌ Page is blank / stuck loading

Fix:
1. Wait 10 seconds (cold start)
2. Refresh page (Ctrl+R)
3. Check Logs for errors
4. Verify Supabase is running

Common: Cold start delay
Solution: Wait and refresh
```

### Issue: Login Fails
```
❌ Login button doesn't work

Fix:
1. Check console errors (F12)
2. Verify SUPABASE_URL secret
3. Verify SUPABASE_SERVICE_ROLE_KEY secret
4. Copy-paste credentials again (exact!)

Common: Wrong credentials
Solution: Double-check and update secret
```

### Issue: File Won't Upload
```
❌ Upload fails / times out

Fix:
1. Check file size (should be <100MB)
2. Check Space storage (Settings → Storage)
3. Verify Terabox has space
4. Check logs for error message

Common: Storage full
Solution: Delete old files or upgrade
```

### Issue: File Doesn't Sync
```
❌ Upload works but file not in Terabox

Fix:
1. Check logs for "[Background Upload] ERROR"
2. Verify TERABOX_USER exact (email/username)
3. Verify TERABOX_PASS exact (correct caps)
4. Check Terabox account has space (50GB+)

Common: Wrong Terabox credentials
Solution: Update secrets with correct values
```

---

## 🎓 NEXT STEPS AFTER SUCCESSFUL DEPLOYMENT

### If Everything Works ✅
```
1. Share the public Space URL with team
2. Test with real files
3. Monitor logs daily
4. Keep running as-is!
```

### If Performance is Slow
```
1. This is normal on shared CPU
2. Monitor for 1-2 weeks
3. Consider upgrading to VPS later
```

### If You Want More Control
```
1. Deploy to Railway ($10/month)
2. Deploy to DigitalOcean ($4/month)
3. Deploy to AWS (~$20/month)
```

---

## 📞 TROUBLESHOOTING FLOWCHART

```
Issue?
 ↓
Red/Orange status?
 ├─ YES → Check Build logs → Fix error → Rebuild
 └─ NO → Continue
 ↓
Page won't load?
 ├─ YES → Wait 10sec → Refresh → Check logs
 └─ NO → Continue
 ↓
Can't login?
 ├─ YES → Check Supabase secrets → Update → Retry
 └─ NO → Continue
 ↓
Upload fails?
 ├─ YES → Check storage → Delete old files → Retry
 └─ NO → Continue
 ↓
Doesn't sync to Terabox?
 ├─ YES → Check Terabox secrets → Update → Test
 └─ NO → Working! 🎉
```

---

## 📚 REFERENCE

- **Quick Start**: HF_SPACES_QUICK_START.txt
- **Detailed Guide**: HF_SPACES_SETUP_GUIDE.md
- **App Overview**: HF_SPACES_README.md
- **This Guide**: HF_SPACES_VISUAL_GUIDE.md
- **Summary**: HUGGING_FACE_DEPLOYMENT_SUMMARY.md

---

## ✨ YOU'RE READY!

Follow this visual guide, and you'll have your app running on Hugging Face Spaces in about 20-25 minutes total.

**Good luck! 🚀**
