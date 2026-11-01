
import {
    ambilDataLahan,
    ambilDataTanaman,
    simpanData,
    buatId,
    simpanStatusLogin,
    cekStatusLogin,
    hapusStatusLogin
} from "./data-service.js";

import {
    validasiLahan,
    validasiTanaman,
    validasiLogin
} from "./form-validator.js";

import {
    renderLahan,
    renderTanaman,
    renderDashboard
} from "./ui-renderer.js";


// ========================================
// 1. MENYIMPAN DATA
// ========================================

let dataLahan = ambilDataLahan();
let dataTanaman = ambilDataTanaman();


// ========================================
// 2. FUNGSI BANTUAN
// ========================================

function tanggalHariIni() {
    const elemenTanggal = document.getElementById("todayLabel");

    if (!elemenTanggal) return;

    const tanggal = new Date();

    elemenTanggal.textContent = tanggal.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


function tampilkanPesan(id, pesan, sukses = true) {
    const elemen = document.getElementById(id);

    if (!elemen) return;

    elemen.textContent = pesan;
    elemen.className = sukses
        ? "form-message success"
        : "form-message error";

    elemen.hidden = false;
}


function tutupForm(id) {
    const form = document.getElementById(id);

    if (form) {
        form.hidden = true;
    }
}


function bukaForm(id) {
    const form = document.getElementById(id);

    if (form) {
        form.hidden = false;
    }
}


function simpanSemuaData() {
    simpanData(dataLahan, dataTanaman);
}


function perbaruiDashboard() {
    renderDashboard(dataLahan, dataTanaman);
}


// ========================================
// 3. LOGIN DAN LOGOUT
// ========================================

// Mengecek status login sebelum membuka halaman aplikasi
function periksaLogin() {
    const halamanAplikasi = document.querySelector(".app-shell");

    if (halamanAplikasi && !cekStatusLogin()) {
        window.location.replace("pages/login.html");
        return false;
    }

    return true;
}


// Mengatur proses login
function inisialisasiLogin() {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    // Jika sudah login, langsung menuju dashboard
    if (cekStatusLogin()) {
        window.location.replace("../index.html");
        return;
    }

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validasiLogin()) return;

        const username = document
            .getElementById("usernameLogin")
            .value.trim();

        const password = document
            .getElementById("passwordLogin")
            .value;

        if (username === "admin" && password === "tani123") {
            simpanStatusLogin(username);

            tampilkanPesan(
                "loginMessage",
                "Login berhasil. Mengarahkan ke dashboard...",
                true
            );

            window.location.replace("../index.html");

        } else {
            tampilkanPesan(
                "loginMessage",
                "Username atau password salah.",
                false
            );
        }
    });
}


// Mengatur proses logout
function inisialisasiLogout() {
    const tombolLogout = document.getElementById("logoutButton");

    if (!tombolLogout) return;

    tombolLogout.addEventListener("click", function () {
        const yakin = confirm("Apakah kamu yakin ingin logout?");

        if (yakin) {
            hapusStatusLogin();
            window.location.replace("pages/login.html");
        }
    });
}


// ========================================
// 4. DATA LAHAN
// ========================================

function resetFormLahan() {
    const form = document.getElementById("lahanForm");

    if (!form) return;

    form.reset();

    document.getElementById("lahanId").value = "";
    document.getElementById("lahanFormTitle").textContent = "Tambah Data Lahan";

    const pesan = document.getElementById("lahanMessage");

    if (pesan) {
        pesan.hidden = true;
        pesan.textContent = "";
    }
}


function simpanLahan(event) {
    event.preventDefault();

    if (!validasiLahan()) return;

    const id = document.getElementById("lahanId").value;

    const lahanBaru = {
        id: id || buatId(),
        nama: document.getElementById("namaLahan").value.trim(),
        luas: Number(document.getElementById("luasLahan").value),
        lokasi: document.getElementById("lokasiLahan").value.trim(),
        status: document.getElementById("statusLahan").value,
        catatan: document.getElementById("catatanLahan").value.trim()
    };

    if (id) {
        dataLahan = dataLahan.map(function (lahan) {
            return lahan.id === id ? lahanBaru : lahan;
        });

        tampilkanPesan(
            "lahanMessage",
            "Data lahan berhasil diperbarui."
        );

    } else {
        dataLahan.push(lahanBaru);

        tampilkanPesan(
            "lahanMessage",
            "Data lahan berhasil ditambahkan."
        );
    }

    simpanSemuaData();

    renderLahan(dataLahan);
    perbaruiDashboard();

    resetFormLahan();
    tutupForm("lahanFormCard");
}


function editLahan(id) {
    const lahan = dataLahan.find(function (item) {
        return item.id === id;
    });

    if (!lahan) return;

    bukaForm("lahanFormCard");

    document.getElementById("lahanId").value = lahan.id;
    document.getElementById("namaLahan").value = lahan.nama;
    document.getElementById("luasLahan").value = lahan.luas;
    document.getElementById("lokasiLahan").value = lahan.lokasi;
    document.getElementById("statusLahan").value = lahan.status;
    document.getElementById("catatanLahan").value = lahan.catatan || "";

    document.getElementById("lahanFormTitle").textContent = "Edit Data Lahan";

    document.getElementById("lahanFormCard").scrollIntoView({
        behavior: "smooth"
    });
}


function hapusLahan(id) {
    const tanamanTerhubung = dataTanaman.some(function (tanaman) {
        return tanaman.lahanId === id;
    });

    if (tanamanTerhubung) {
        alert("Lahan tidak bisa dihapus karena masih memiliki data tanaman.");
        return;
    }

    const yakin = confirm("Apakah kamu yakin ingin menghapus data lahan ini?");

    if (!yakin) return;

    dataLahan = dataLahan.filter(function (lahan) {
        return lahan.id !== id;
    });

    simpanSemuaData();

    renderLahan(dataLahan);
    perbaruiDashboard();
}


// ========================================
// 5. DATA TANAMAN
// ========================================

function isiPilihanLahan() {
    const pilihanLahan = document.getElementById("lahanTanaman");

    if (!pilihanLahan) return;

    pilihanLahan.innerHTML = '<option value="">Pilih Lahan</option>';

    dataLahan.forEach(function (lahan) {
        const option = document.createElement("option");

        option.value = lahan.id;
        option.textContent = lahan.nama;

        pilihanLahan.appendChild(option);
    });
}


function resetFormTanaman() {
    const form = document.getElementById("tanamanForm");

    if (!form) return;

    form.reset();

    document.getElementById("tanamanId").value = "";

    document.getElementById("tanamanFormTitle").textContent =
        "Tambah Data Tanaman";

    const pesan = document.getElementById("tanamanMessage");

    if (pesan) {
        pesan.hidden = true;
        pesan.textContent = "";
    }
}


function simpanTanaman(event) {
    event.preventDefault();

    if (!validasiTanaman(dataLahan)) return;

    const id = document.getElementById("tanamanId").value;

    const tanamanBaru = {
        id: id || buatId(),
        nama: document.getElementById("namaTanaman").value.trim(),
        jenis: document.getElementById("jenisTanaman").value,
        lahanId: document.getElementById("lahanTanaman").value,
        tanggal: document.getElementById("tanggalTanam").value,
        status: document.getElementById("statusTanaman").value
    };

    if (id) {
        dataTanaman = dataTanaman.map(function (tanaman) {
            return tanaman.id === id ? tanamanBaru : tanaman;
        });

        tampilkanPesan(
            "tanamanMessage",
            "Data tanaman berhasil diperbarui."
        );

    } else {
        dataTanaman.push(tanamanBaru);

        tampilkanPesan(
            "tanamanMessage",
            "Data tanaman berhasil ditambahkan."
        );
    }

    simpanSemuaData();

    renderTanaman(dataTanaman, dataLahan);
    perbaruiDashboard();

    resetFormTanaman();
    tutupForm("tanamanFormCard");
}


function editTanaman(id) {
    const tanaman = dataTanaman.find(function (item) {
        return item.id === id;
    });

    if (!tanaman) return;

    bukaForm("tanamanFormCard");

    isiPilihanLahan();

    document.getElementById("tanamanId").value = tanaman.id;
    document.getElementById("namaTanaman").value = tanaman.nama;
    document.getElementById("jenisTanaman").value = tanaman.jenis;
    document.getElementById("lahanTanaman").value = tanaman.lahanId;
    document.getElementById("tanggalTanam").value = tanaman.tanggal;
    document.getElementById("statusTanaman").value = tanaman.status;

    document.getElementById("tanamanFormTitle").textContent =
        "Edit Data Tanaman";

    document.getElementById("tanamanFormCard").scrollIntoView({
        behavior: "smooth"
    });
}


function hapusTanaman(id) {
    const yakin = confirm("Apakah kamu yakin ingin menghapus data tanaman ini?");

    if (!yakin) return;

    dataTanaman = dataTanaman.filter(function (tanaman) {
        return tanaman.id !== id;
    });

    simpanSemuaData();

    renderTanaman(dataTanaman, dataLahan);
    perbaruiDashboard();
}


// ========================================
// 6. INISIALISASI HALAMAN
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // Periksa login sebelum menjalankan halaman aplikasi
    if (!periksaLogin()) return;

    // Jalankan fitur login dan logout
    inisialisasiLogin();
    inisialisasiLogout();

    // Tampilkan tanggal
    tanggalHariIni();


    // ------------------------------------
    // DASHBOARD
    // ------------------------------------

    if (document.getElementById("totalLahan")) {
        perbaruiDashboard();
    }


    // ------------------------------------
    // HALAMAN DATA LAHAN
    // ------------------------------------

    const lahanForm = document.getElementById("lahanForm");

    if (lahanForm) {

        renderLahan(dataLahan);
        perbaruiDashboard();

        isiPilihanLahan();

        lahanForm.addEventListener("submit", simpanLahan);

        document.getElementById("showLahanForm")
            ?.addEventListener("click", function () {
                resetFormLahan();
                bukaForm("lahanFormCard");
            });

        document.getElementById("closeLahanForm")
            ?.addEventListener("click", function () {
                tutupForm("lahanFormCard");
            });

        document.getElementById("cancelLahanForm")
            ?.addEventListener("click", function () {
                resetFormLahan();
                tutupForm("lahanFormCard");
            });

        document.getElementById("searchLahan")
            ?.addEventListener("input", function () {
                renderLahan(dataLahan);
            });

        document.getElementById("lahanTableBody")
            ?.addEventListener("click", function (event) {

                const tombolEdit = event.target.closest("[data-edit-lahan]");
                const tombolHapus = event.target.closest("[data-delete-lahan]");

                if (tombolEdit) {
                    editLahan(tombolEdit.dataset.editLahan);
                }

                if (tombolHapus) {
                    hapusLahan(tombolHapus.dataset.deleteLahan);
                }
            });
    }


    // ------------------------------------
    // HALAMAN DATA TANAMAN
    // ------------------------------------

    const tanamanForm = document.getElementById("tanamanForm");

    if (tanamanForm) {

        isiPilihanLahan();

        renderTanaman(dataTanaman, dataLahan);
        perbaruiDashboard();

        tanamanForm.addEventListener("submit", simpanTanaman);

        document.getElementById("showTanamanForm")
            ?.addEventListener("click", function () {
                resetFormTanaman();
                isiPilihanLahan();
                bukaForm("tanamanFormCard");
            });

        document.getElementById("closeTanamanForm")
            ?.addEventListener("click", function () {
                tutupForm("tanamanFormCard");
            });

        document.getElementById("cancelTanamanForm")
            ?.addEventListener("click", function () {
                resetFormTanaman();
                tutupForm("tanamanFormCard");
            });

        document.getElementById("searchTanaman")
            ?.addEventListener("input", function () {
                renderTanaman(dataTanaman, dataLahan);
            });

        document.getElementById("tanamanTableBody")
            ?.addEventListener("click", function (event) {

                const tombolEdit = event.target.closest("[data-edit-tanaman]");
                const tombolHapus = event.target.closest("[data-delete-tanaman]");

                if (tombolEdit) {
                    editTanaman(tombolEdit.dataset.editTanaman);
                }

                if (tombolHapus) {
                    hapusTanaman(tombolHapus.dataset.deleteTanaman);
                }
            });
    }

});
