
function tampilkanError(id, pesan = "") {
    const input = document.getElementById(id);
    const error = document.getElementById(id + "Error");

    if (input) {
        input.classList.toggle("input-error", pesan !== "");
        input.setAttribute("aria-invalid", pesan !== "" ? "true" : "false");
    }

    if (error) {
        error.textContent = pesan;
        error.hidden = pesan === "";
    }
}


function hapusSemuaError(form) {
    if (!form) return;

    form.querySelectorAll(".field-error").forEach(function (error) {
        error.textContent = "";
        error.hidden = true;
    });

    form.querySelectorAll(".input-error").forEach(function (input) {
        input.classList.remove("input-error");
        input.setAttribute("aria-invalid", "false");
    });
}


// ========================================
// VALIDASI LOGIN
// ========================================

export function validasiLogin() {
    const form = document.getElementById("loginForm");

    hapusSemuaError(form);

    const username = document.getElementById("usernameLogin").value.trim();
    const password = document.getElementById("passwordLogin").value;

    let valid = true;

    if (username === "") {
        tampilkanError("usernameLogin", "Username wajib diisi.");
        valid = false;
    }

    if (password === "") {
        tampilkanError("passwordLogin", "Password wajib diisi.");
        valid = false;
    }

    return valid;
}


// ========================================
// VALIDASI DATA LAHAN
// ========================================

export function validasiLahan() {
    const form = document.getElementById("lahanForm");

    hapusSemuaError(form);

    const nama = document.getElementById("namaLahan").value.trim();
    const luas = document.getElementById("luasLahan").value;
    const lokasi = document.getElementById("lokasiLahan").value.trim();
    const status = document.getElementById("statusLahan").value;

    let valid = true;

    if (nama === "") {
        tampilkanError("namaLahan", "Nama lahan wajib diisi.");
        valid = false;
    }

    if (luas === "" || Number(luas) <= 0) {
        tampilkanError("luasLahan", "Luas lahan harus lebih dari 0.");
        valid = false;
    }

    if (lokasi === "") {
        tampilkanError("lokasiLahan", "Lokasi lahan wajib diisi.");
        valid = false;
    }

    if (status === "") {
        tampilkanError("statusLahan", "Status lahan wajib dipilih.");
        valid = false;
    }

    return valid;
}


// ========================================
// VALIDASI DATA TANAMAN
// ========================================

export function validasiTanaman(dataLahan = []) {
    const form = document.getElementById("tanamanForm");

    hapusSemuaError(form);

    const nama = document.getElementById("namaTanaman").value.trim();
    const jenis = document.getElementById("jenisTanaman").value;
    const lahan = document.getElementById("lahanTanaman").value;
    const tanggal = document.getElementById("tanggalTanam").value;
    const status = document.getElementById("statusTanaman").value;

    let valid = true;

    if (nama === "") {
        tampilkanError("namaTanaman", "Nama tanaman wajib diisi.");
        valid = false;
    }

    if (jenis === "") {
        tampilkanError("jenisTanaman", "Jenis tanaman wajib dipilih.");
        valid = false;
    }

    const lahanDitemukan = dataLahan.some(function (item) {
        return String(item.id) === String(lahan);
    });

    if (!lahanDitemukan) {
        tampilkanError("lahanTanaman", "Pilih lahan yang tersedia.");
        valid = false;
    }

    if (tanggal === "") {
        tampilkanError("tanggalTanam", "Tanggal tanam wajib diisi.");
        valid = false;
    }

    if (status === "") {
        tampilkanError("statusTanaman", "Status tanaman wajib dipilih.");
        valid = false;
    }

    return valid;
}
