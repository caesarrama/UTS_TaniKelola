# TaniKelola – Sistem Manajemen Data Lahan dan Tanaman

## Deskripsi Project

TaniKelola merupakan website sederhana yang dibuat untuk membantu pengguna dalam mengelola data lahan dan tanaman. Website ini memiliki tampilan yang sederhana dan responsif agar mudah digunakan melalui komputer maupun perangkat mobile.

Project ini dibuat untuk memenuhi tugas Ujian Tengah Semester (UTS) mata kuliah Pemrograman Dasar Frontend.

## Fitur Website

### 1. Dashboard
- Menampilkan jumlah total data lahan.
- Menampilkan jumlah total data tanaman.
- Menampilkan data terbaru.

### 2. Manajemen Data Lahan
- Menambahkan data lahan.
- Mengedit data lahan.
- Menghapus data lahan.
- Mencari data lahan.
- Melakukan validasi input.

### 3. Manajemen Data Tanaman
- Menambahkan data tanaman.
- Mengedit data tanaman.
- Menghapus data tanaman.
- Mencari data tanaman.
- Menghubungkan tanaman dengan data lahan.
- Melakukan validasi input.

### 4. Penyimpanan Data
- Menggunakan Local Storage untuk menyimpan data.
- Data tetap tersedia setelah halaman dimuat ulang.

## Teknologi yang Digunakan

- HTML5
- CSS3
- JavaScript ES6+
- JavaScript Modules (ES Modules)
- DOM Manipulation
- Local Storage

## Struktur Folder

```text
Frontend/
│
├── index.html
├── README.md
│
├── pages/
│   ├── lahan.html
│   └── tanaman.html
│
└── assets/
    ├── css/
    │   └── style.css
    │
    └── js/
        ├── main.js
        ├── data-service.js
        ├── form-validator.js
        └── ui-renderer.js
```

## Pembagian Modul JavaScript

- **main.js**: Mengatur alur utama website dan event.
- **data-service.js**: Mengelola penyimpanan dan pengambilan data.
- **form-validator.js**: Melakukan validasi data pada form.
- **ui-renderer.js**: Mengatur tampilan data menggunakan DOM.

## Cara Menjalankan Project

1. Download atau clone repository project.
2. Buka folder project menggunakan Visual Studio Code.
3. Jalankan file `index.html` menggunakan ekstensi Live Server.
4. Website TaniKelola akan terbuka melalui browser.

## Penyimpanan Data

Project ini menggunakan Local Storage pada browser sebagai tempat penyimpanan data lahan dan tanaman. Data tersimpan pada browser yang digunakan.

## Penutup

TaniKelola dibuat sebagai project pembelajaran untuk menerapkan HTML, CSS, dan JavaScript dalam membangun website yang memiliki fitur pengelolaan data secara interaktif.