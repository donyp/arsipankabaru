---
title: Pusat Arsip Anka
emoji: 📂
colorFrom: indigo
colorTo: blue
sdk: docker
sdk_version: "1.0"
app_file: backend/server.js
pinned: false
---

# 🏢 Pusat Arsip Anka

Digital archive system with Terabox cloud integration and multi-zone file management.

## ✨ Features

- File upload and management
- Terabox cloud integration via Rclone WebDAV
- User authentication (JWT)
- File preview and download
- Multi-zone organization
- Database integration (Supabase)
- Background file sync with retry logic

## 🚀 Deployment

This application runs on Docker in Hugging Face Spaces.

### Required Environment Variables

Set these in **Settings → Repository Secrets**:

```
SUPABASE_URL                    # Your Supabase project URL
SUPABASE_SERVICE_ROLE_KEY       # Supabase service role API key
JWT_SECRET                      # JWT signing secret (minimum 32 characters)
TERABOX_WEBDAV_URL             # https://pan.baidu.com/api/publicweb/terabox.php
TERABOX_USER                   # Terabox username/email
TERABOX_PASS                   # Terabox password
```

## 🔧 Architecture

- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **Storage**: Local + Terabox (Rclone WebDAV)
- **Frontend**: HTML5 + CSS3 + Vanilla JavaScript
- **Container**: Docker

## 📁 Project Structure

```
/
├── backend/              # Node.js Express server
├── css/                  # Stylesheets
├── js/                   # Frontend JavaScript
├── *.html                # HTML pages
├── Dockerfile            # Docker configuration
├── start.sh              # Startup script
└── rclone.conf           # Rclone configuration
```

## 📝 Documentation

- **Setup Guide**: SETUP_SECRETS.md
- **Quick Start**: HF_SPACES_QUICK_START.txt
- **Detailed Guide**: HF_SPACES_SETUP_GUIDE.md

## 🔗 Links

- **GitHub**: https://github.com/donyp/arsipankabaru
- **Terabox**: https://terabox.com
- **Supabase**: https://supabase.com

## 📞 Support

For issues or questions, check:
1. Application logs (Space → Logs)
2. GitHub issues: https://github.com/donyp/arsipankabaru/issues
3. Documentation in this repository

## 📄 License

OpenRAIL
