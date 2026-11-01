# TaniKelola – Sistem Manajemen Data Lahan dan Tanaman

## Deskripsi Project

TaniKelola merupakan aplikasi frontend berbasis web yang dibuat untuk membantu pengguna dalam mengelola data lahan dan tanaman. Aplikasi ini memiliki tampilan sederhana dan responsif sehingga pengguna dapat mengelola informasi dengan lebih mudah.

Project ini dibuat untuk memenuhi tugas Ujian Tengah Semester (UTS) mata kuliah Frontend.

## Tujuan Project

1. Membuat aplikasi pengelolaan data lahan dan tanaman.
2. Menerapkan HTML5 Semantik.
3. Menggunakan CSS Modern Responsive.
4. Menerapkan JavaScript ES6+ dan ES Modules.
5. Menggunakan manipulasi DOM dan Event Handling.
6. Menerapkan validasi form pada sisi client.

## Fitur Aplikasi

### 1. Login dan Logout
- Halaman login untuk masuk ke aplikasi.
- Validasi username dan password.
- Fitur logout untuk mengakhiri sesi pengguna.

Akun demo:
- Username: `admin`
- Password: `tani123`

### 2. Dashboard
- Menampilkan jumlah data lahan.
- Menampilkan jumlah data tanaman.
- Menampilkan ringkasan data terbaru.

### 3. Data Lahan
- Menambahkan data lahan.
- Mengedit data lahan.
- Menghapus data lahan.
- Mencari data lahan.
- Menampilkan informasi nama, luas, lokasi, status, dan catatan lahan.

### 4. Data Tanaman
- Menambahkan data tanaman.
- Mengedit data tanaman.
- Menghapus data tanaman.
- Mencari data tanaman.
- Menghubungkan data tanaman dengan data lahan.

### 5. Penyimpanan Data
Data aplikasi disimpan menggunakan LocalStorage pada browser sehingga data tetap tersedia ketika halaman dimuat ulang pada browser yang sama.

## Teknologi yang Digunakan

- HTML5
- CSS3
- JavaScript ES6+
- JavaScript ES Modules
- DOM Manipulation
- Event Handling
- Client-Side Form Validation
- LocalStorage
- SessionStorage

Project dibuat menggunakan Vanilla JavaScript tanpa framework atau library eksternal.

## Struktur Folder

```text
Frontend/
│
├── index.html
│
├── pages/
│   ├── login.html
│   ├── lahan.html
│   └── tanaman.html
│
├── assets/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       ├── main.js
│       ├── data-service.js
│       ├── form-validator.js
│       └── ui-renderer.js
│
└── README.md
```

## Cara Menjalankan Aplikasi

1. Clone repository atau download project.
2. Buka folder `Frontend` menggunakan Visual Studio Code.
3. Jalankan file `index.html` menggunakan Live Server.
4. Aplikasi akan mengarahkan pengguna ke halaman Login.
5. Masukkan akun demo untuk masuk ke Dashboard.

## Dokumentasi Tampilan

Tambahkan screenshot aplikasi pada bagian ini:

1. Halaman Login
2. Halaman Dashboard
3. Halaman Data Lahan
4. Halaman Data Tanaman

Simpan screenshot di folder dokumentasi, misalnya `screenshots/`, kemudian tambahkan gambar menggunakan Markdown.

Contoh:

```markdown
![Halaman Login](screenshots/login.png)
```

## Penyimpanan dan Batasan Aplikasi

Aplikasi ini merupakan project frontend yang menggunakan LocalStorage dan SessionStorage pada browser. Data belum terhubung secara langsung dengan database MySQL atau API Backend.

## Repository GitHub

Link repository:

https://github.com/caesarrama/UTS_TaniKelola

---

**TaniKelola – Sistem Manajemen Data Lahan dan Tanaman**

Project Ujian Tengah Semester (UTS)  
Program Studi S1 Teknik Informatika  
STIKOM PGRI Banyuwangi
