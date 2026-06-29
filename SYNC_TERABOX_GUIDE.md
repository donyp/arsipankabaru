# 🔄 Sync Terabox Files to Database

## Masalah

Setelah deploy baru atau migrasi, database Supabase kosong padahal ada file di Terabox.

## Solusi

Gunakan script sync untuk import semua file dari Terabox ke database.

---

## Cara 1: Via API (Recommended - dari Browser)

### Langkah:

1. **Login** ke web sebagai **Moderator** atau **Super Admin**
2. Buka **Developer Console** (F12)
3. Jalankan script berikut:

```javascript
fetch('/api/admin/sync-terabox', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
})
.then(r => r.json())
.then(data => console.log('Sync started:', data))
.catch(err => console.error('Error:', err));
```

4. **Tunggu** ~1-5 menit (tergantung jumlah file)
5. **Refresh** halaman file list
6. File seharusnya sudah muncul!

---

## Cara 2: Via Script Lokal (Development)

### Langkah:

1. Pastikan `rclone.conf` dan `.env` sudah dikonfigurasi
2. Jalankan:

```bash
cd backend
node sync-terabox-to-db.js
```

3. Tunggu hingga selesai
4. Check database - file sudah masuk

---

## Apa Yang Dilakukan Script

1. ✅ Scan semua file di **Terabox** via `rclone lsjson terabox_direct:/`
2. ✅ Parse metadata dari nama file (zona, nama asli)
3. ✅ Insert ke tabel **media** di Supabase
4. ✅ Skip duplicate (jika file sudah ada)
5. ✅ Assign ke user **admin** default

---

## Format Nama File

Script mendeteksi zona dari nama file:

- **Format**: `zonaX_namafile.pdf`
- **Contoh**: `zona1_invoice-2024.pdf` → Zona 1
- **Jika tidak ada prefix**: file masuk tanpa zona

---

## Troubleshooting

### Error: "Failed to list Terabox files"

**Penyebab**: Rclone tidak bisa connect ke Terabox

**Solusi**:
1. Check `rclone.conf` sudah benar
2. Pastikan password sudah obscured
3. Test manual: `rclone --config rclone.conf lsjson terabox_direct:/`

### Error: "Failed to insert"

**Penyebab**: Database error

**Solusi**:
1. Check Supabase credentials
2. Pastikan tabel `media` ada
3. Check constraint/unique key conflicts

### File count masih 0

**Penyebab**: 
- Sync belum selesai (tunggu 1-5 menit)
- Terabox memang kosong
- Error saat sync (check logs)

**Solusi**:
1. Check server logs di HF Spaces
2. Re-run sync API
3. Verify Terabox punya file: `rclone lsjson terabox_direct:/ --recursive`

---

## Logs

### Success Log:
```
[Sync] 🔄 Terabox to Database Sync
[Step 1] Getting admin user...
[Step 1] ✅ Complete
[Step 2] Listing Terabox files...
[Sync] ✅ Found 150 files in Terabox
[Step 3] Inserting files into database...
[Sync] Progress: 50/150 inserted...
[Sync] Progress: 100/150 inserted...
[Sync] ✅ SYNC COMPLETE
Total files in Terabox: 150
✅ Inserted: 145
⚠️  Skipped (duplicates): 5
❌ Failed: 0
```

### Error Log:
```
[Sync] ❌ Failed to list Terabox files
[Sync] Error: directory not found
```

---

## FAQ

**Q: Apakah file di Terabox akan di-download?**  
A: Tidak. Script hanya membaca metadata (nama, size, path) lalu insert ke database.

**Q: Apakah aman untuk re-run berkali-kali?**  
A: Ya. Script skip duplicate otomatis.

**Q: Berapa lama sync untuk 1000 file?**  
A: ~2-5 menit (tergantung network dan database).

**Q: Apakah bisa sync folder tertentu saja?**  
A: Saat ini sync semua file. Untuk custom, edit `sync-terabox-to-db.js`.

---

## Next Steps

Setelah sync selesai:
1. ✅ Refresh web UI
2. ✅ Check file list - file seharusnya muncul
3. ✅ Test download/preview
4. ✅ Check stats/chart - data seharusnya update

Selamat! File lama Anda sudah ter-restore! 🎉
