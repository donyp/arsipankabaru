# Pusat Arsip Anka - Hugging Face Spaces Deployment

This is a Node.js + Express backend for digital archive management with Terabox integration.

## 🚀 Quick Start

### 1. Fork or Clone to Your Hugging Face Space

On Hugging Face Spaces:
```bash
# Create new Space with Docker SDK
# Repository: https://github.com/donyp/arsipankabaru.git
```

### 2. Set Environment Variables

Go to **Space Settings → Secrets** and add:

```
# Required (from previous Google Secret Manager)
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-key
JWT_SECRET=your-jwt-secret

# Terabox WebDAV (Direct connection)
TERABOX_WEBDAV_URL=https://pan.baidu.com/api/publicweb/terabox.php
TERABOX_USER=your-terabox-username
TERABOX_PASS=your-terabox-password
TERABOX_CRYPT_PASSWORD=your-crypt-password (optional)

# Optional: Storj Integration
STORJ_ACCESS_KEY=your-storj-key (optional)
STORJ_SECRET_KEY=your-storj-secret (optional)
```

### 3. Hugging Face Auto-Deploys

Once secrets are set, Hugging Face automatically:
- Builds Docker image
- Starts container with port 7860
- Provides public URL

Your app will be available at: `https://huggingface.co/spaces/[username]/[space-name]`

## 📊 Application Features

- ✅ File upload to local storage
- ✅ File sync to Terabox via Rclone
- ✅ File preview & download
- ✅ JWT-based authentication
- ✅ User management (admin, user roles)
- ✅ Database: Supabase (PostgreSQL)
- ✅ Background sync with retry logic

## ⚠️ Important Notes

### Storage Limitations
- Hugging Face Spaces: 50GB persistent storage
- Your files stored in `/app/data/files/`
- Database stored in `/app/data/db/`

### Performance
- CPU: Shared (might be slower than dedicated VPS)
- Memory: Sufficient for normal operations
- Cold start: ~5-10 seconds on first request

### Availability
- **Always On**: As long as space is active
- **Sleep**: After 48 hours of no traffic (auto-wakes on request)
- **Restarts**: Space can restart without warning

### Best Practices
1. Monitor logs regularly for errors
2. Set up backup of important files to Terabox
3. Keep Supabase credentials secure
4. Use HTTPS-only connections

## 🔧 Troubleshooting

### App won't start
1. Check Docker build logs in Space settings
2. Verify all environment variables set
3. Check Supabase connectivity

### "Connection refused" errors
1. Verify Terabox WebDAV credentials
2. Check Supabase URL is correct
3. Ensure API keys have proper permissions

### Files not syncing
1. Check Rclone logs: `/app/data/log/`
2. Verify Terabox account has space available
3. Check file upload endpoint returns success

### Storage full
1. Clean old files from `/app/data/files/`
2. Archive to Terabox and delete local copies
3. Upgrade to larger VPS

## 📝 Files & Directories

```
/app/
├── backend/              # Node.js Express server
├── frontend/            # HTML/CSS/JS files
├── data/
│  ├── files/           # Uploaded files storage
│  ├── db/              # Database files
│  └── log/             # Application logs
└── rclone.conf         # Auto-generated at startup
```

## 🔗 Links

- **GitHub**: https://github.com/donyp/arsipankabaru
- **Terabox**: https://terabox.com
- **Supabase**: https://supabase.com
- **Hugging Face**: https://huggingface.co

## 📞 Support

For issues or questions:
1. Check application logs in Hugging Face Space
2. Review GitHub issues: https://github.com/donyp/arsipankabaru/issues
3. Check Supabase documentation

---

**Last Updated**: 2024
**Status**: Production Ready
