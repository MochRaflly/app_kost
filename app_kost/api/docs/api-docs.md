# Dokumentasi API Aplikasi Kos

## Endpoint: Penghuni

### GET /penghuni
- Deskripsi: Mendapatkan daftar semua penghuni kos
- Response:
  - 200 OK
  - Format JSON

#### Contoh Response
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nama": "Rafly",
      "no_ktp": "3201010101010001",
      "no_hp": "081234567890",
      "tgl_masuk": "2024-01-10",
      "tgl_keluar": null
    },
    ...
  ]
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

---

Endpoint lain akan didokumentasikan di sini. 