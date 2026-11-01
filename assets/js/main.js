
/* =====================================
   IMPORT MODUL
===================================== */

// Modul Data Service
import {
    ambilDataLahan,
    ambilDataTanaman,
    simpanData,
    buatId
} from "./data-service.js";

// Modul Form Validator
import {
    validasiLahan,
    validasiTanaman
} from "./form-validator.js";

// Modul UI Renderer
import {
    renderLahan,
    renderTanaman,
    renderDashboard
} from "./ui-renderer.js";


/* =====================================
   DATA UTAMA
===================================== */

// Mengambil data dari localStorage
let dataLahan = ambilDataLahan();
let dataTanaman = ambilDataTanaman();


/* =====================================
   FUNGSI BANTU
===================================== */

// Menampilkan tanggal hari ini
function tanggalHariIni() {
    const elemen = document.getElementById("todayLabel");

    if (elemen) {
        elemen.textContent = new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }
}

// Menampilkan pesan berhasil atau gagal
function tampilkanPesan(id, pesan, sukses = true) {
    const elemen = document.getElementById(id);

    if (!elemen) return;

    elemen.textContent = pesan;
    elemen.hidden = false;
    elemen.style.color = sukses ? "#28794d" : "#b42318";
}

// Menutup form
function tutupForm(id) {
    const formCard = document.getElementById(id);

    if (formCard) {
        formCard.hidden = true;
    }
}

// Membuka form
function bukaForm(id) {
    const formCard = document.getElementById(id);

    if (formCard) {
        formCard.hidden = false;
        formCard.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

// Menyimpan seluruh perubahan data
function simpanSemuaData() {
    simpanData(dataLahan, dataTanaman);
}

// Memperbarui seluruh tampilan dashboard
function perbaruiDashboard() {
    renderDashboard(dataLahan, dataTanaman);
}


/* =====================================
   HALAMAN DATA LAHAN
===================================== */

// Mengosongkan form lahan
function resetFormLahan() {
    const form = document.getElementById("lahanForm");

    if (!form) return;

    form.reset();

    document.getElementById("lahanId").value = "";

    document.getElementById("lahanFormTitle").textContent =
        "Tambah Data Lahan";

    const message = document.getElementById("lahanMessage");

    if (message) {
        message.hidden = true;
    }
}

// Menyimpan data lahan
function simpanLahan(event) {
    event.preventDefault();

    // Validasi input
    if (!validasiLahan()) {
        tampilkanPesan(
            "lahanMessage",
            "Periksa kembali kolom yang berwarna merah.",
            false
        );
        return;
    }

    const id = document.getElementById("lahanId").value;

    const data = {
        id: id || buatId(),
        nama: document.getElementById("namaLahan").value.trim(),
        luas: Number(document.getElementById("luasLahan").value),
        lokasi: document.getElementById("lokasiLahan").value.trim(),
        status: document.getElementById("statusLahan").value,
        catatan: document.getElementById("catatanLahan").value.trim()
    };

    // Jika ID tersedia, berarti mengedit data
    if (id) {
        dataLahan = dataLahan.map(item =>
            item.id === id ? data : item
        );

        tampilkanPesan(
            "lahanMessage",
            "Data lahan berhasil diperbarui."
        );

    } else {
        // Jika ID belum tersedia, berarti menambah data
        dataLahan.push(data);
    }

    simpanSemuaData();

    renderLahan(dataLahan);
    perbaruiDashboard();
    isiPilihanLahan();

    resetFormLahan();
    tutupForm("lahanFormCard");
}

// Mengedit data lahan
function editLahan(id) {
    const lahan = dataLahan.find(item => item.id === id);

    if (!lahan) return;

    document.getElementById("lahanId").value = lahan.id;
    document.getElementById("namaLahan").value = lahan.nama;
    document.getElementById("luasLahan").value = lahan.luas;
    document.getElementById("lokasiLahan").value = lahan.lokasi;
    document.getElementById("statusLahan").value = lahan.status;
    document.getElementById("catatanLahan").value =
        lahan.catatan || "";

    document.getElementById("lahanFormTitle").textContent =
        "Edit Data Lahan";

    bukaForm("lahanFormCard");
}

// Menghapus data lahan
function hapusLahan(id) {
    // Memeriksa apakah lahan masih digunakan tanaman
    const terkait = dataTanaman.some(
        tanaman => tanaman.lahanId === id
    );

    if (terkait) {
        alert(
            "Lahan ini masih digunakan oleh data tanaman. " +
            "Hapus atau pindahkan data tanamannya terlebih dahulu."
        );
        return;
    }

    if (!confirm("Yakin ingin menghapus data lahan ini?")) {
        return;
    }

    dataLahan = dataLahan.filter(item => item.id !== id);

    simpanSemuaData();

    renderLahan(dataLahan);
    perbaruiDashboard();
    isiPilihanLahan();
}


/* =====================================
   HALAMAN DATA TANAMAN
===================================== */

// Mengisi pilihan lahan pada form tanaman
function isiPilihanLahan(idTerpilih = "") {
    const select = document.getElementById("lahanTanaman");

    if (!select) return;

    select.replaceChildren();

    const pilihanAwal = document.createElement("option");

    pilihanAwal.value = "";
    pilihanAwal.textContent = "Pilih lahan";

    select.appendChild(pilihanAwal);

    dataLahan.forEach(lahan => {
        const option = document.createElement("option");

        option.value = lahan.id;
        option.textContent = lahan.nama;

        if (lahan.id === idTerpilih) {
            option.selected = true;
        }

        select.appendChild(option);
    });
}

// Mengosongkan form tanaman
function resetFormTanaman() {
    const form = document.getElementById("tanamanForm");

    if (!form) return;

    form.reset();

    document.getElementById("tanamanId").value = "";

    document.getElementById("tanamanFormTitle").textContent =
        "Tambah Data Tanaman";

    isiPilihanLahan();

    const message = document.getElementById("tanamanMessage");

    if (message) {
        message.hidden = true;
    }
}

// Menyimpan data tanaman
function simpanTanaman(event) {
    event.preventDefault();

    // Validasi input tanaman
    if (!validasiTanaman(dataLahan)) {
        tampilkanPesan(
            "tanamanMessage",
            "Periksa kembali kolom yang berwarna merah.",
            false
        );
        return;
    }

    const id = document.getElementById("tanamanId").value;

    const data = {
        id: id || buatId(),
        nama: document.getElementById("namaTanaman").value.trim(),
        jenis: document.getElementById("jenisTanaman").value,
        lahanId: document.getElementById("lahanTanaman").value,
        tanggal: document.getElementById("tanggalTanam").value,
        status: document.getElementById("statusTanaman").value
    };

    // Jika ID tersedia, berarti mengedit data
    if (id) {
        dataTanaman = dataTanaman.map(item =>
            item.id === id ? data : item
        );
    } else {
        // Jika ID belum tersedia, berarti menambah data
        dataTanaman.push(data);
    }

    simpanSemuaData();

    renderTanaman(dataTanaman, dataLahan);
    perbaruiDashboard();

    resetFormTanaman();
    tutupForm("tanamanFormCard");
}

// Mengedit data tanaman
function editTanaman(id) {
    const tanaman = dataTanaman.find(item => item.id === id);

    if (!tanaman) return;

    document.getElementById("tanamanId").value = tanaman.id;
    document.getElementById("namaTanaman").value = tanaman.nama;
    document.getElementById("jenisTanaman").value = tanaman.jenis;

    isiPilihanLahan(tanaman.lahanId);

    document.getElementById("tanggalTanam").value =
        tanaman.tanggal;

    document.getElementById("statusTanaman").value =
        tanaman.status;

    document.getElementById("tanamanFormTitle").textContent =
        "Edit Data Tanaman";

    bukaForm("tanamanFormCard");
}

// Menghapus data tanaman
function hapusTanaman(id) {
    if (!confirm("Yakin ingin menghapus data tanaman ini?")) {
        return;
    }

    dataTanaman = dataTanaman.filter(item => item.id !== id);

    simpanSemuaData();

    renderTanaman(dataTanaman, dataLahan);
    perbaruiDashboard();
}


/* =====================================
   EVENT DAN INISIALISASI
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Menampilkan tanggal dan dashboard
    tanggalHariIni();
    perbaruiDashboard();


    /* ---------------------------------
       EVENT HALAMAN LAHAN
    --------------------------------- */

    const lahanForm = document.getElementById("lahanForm");

    if (lahanForm) {

        renderLahan(dataLahan);

        // Tombol tambah lahan
        document.getElementById("showLahanForm")
            .addEventListener("click", () => {

                resetFormLahan();
                bukaForm("lahanFormCard");

            });

        // Tombol tutup form
        document.getElementById("closeLahanForm")
            .addEventListener("click", () => {

                tutupForm("lahanFormCard");

            });

        // Tombol batal
        document.getElementById("cancelLahanForm")
            .addEventListener("click", () => {

                resetFormLahan();
                tutupForm("lahanFormCard");

            });

        // Event submit form
        lahanForm.addEventListener("submit", simpanLahan);

        // Event pencarian lahan
        document.getElementById("searchLahan")
            .addEventListener("input", () => {

                renderLahan(dataLahan);

            });

        // Event tombol edit dan hapus
        document.getElementById("lahanTableBody")
            .addEventListener("click", event => {

                const edit = event.target.closest("[data-edit-lahan]");
                const hapus = event.target.closest("[data-delete-lahan]");

                if (edit) {
                    editLahan(edit.dataset.editLahan);
                }

                if (hapus) {
                    hapusLahan(hapus.dataset.deleteLahan);
                }

            });
    }


    /* ---------------------------------
       EVENT HALAMAN TANAMAN
    --------------------------------- */

    const tanamanForm = document.getElementById("tanamanForm");

    if (tanamanForm) {

        isiPilihanLahan();
        renderTanaman(dataTanaman, dataLahan);

        // Tombol tambah tanaman
        document.getElementById("showTanamanForm")
            .addEventListener("click", () => {

                resetFormTanaman();
                bukaForm("tanamanFormCard");

            });

        // Tombol tutup form
        document.getElementById("closeTanamanForm")
            .addEventListener("click", () => {

                tutupForm("tanamanFormCard");

            });

        // Tombol batal
        document.getElementById("cancelTanamanForm")
            .addEventListener("click", () => {

                resetFormTanaman();
                tutupForm("tanamanFormCard");

            });

        // Event submit form
        tanamanForm.addEventListener("submit", simpanTanaman);

        // Event pencarian tanaman
        document.getElementById("searchTanaman")
            .addEventListener("input", () => {

                renderTanaman(dataTanaman, dataLahan);

            });

        // Event tombol edit dan hapus
        document.getElementById("tanamanTableBody")
            .addEventListener("click", event => {

                const edit = event.target.closest("[data-edit-tanaman]");
                const hapus = event.target.closest("[data-delete-tanaman]");

                if (edit) {
                    editTanaman(edit.dataset.editTanaman);
                }

                if (hapus) {
                    hapusTanaman(hapus.dataset.deleteTanaman);
                }

            });
    }

});
