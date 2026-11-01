
// Menampilkan pesan error pada input
function tampilkanError(id, pesan = "") {
    const input = document.getElementById(id);
    const error = document.getElementById(id + "Error");

    if (input) {
        input.classList.toggle("input-error", Boolean(pesan));
        input.setAttribute(
            "aria-invalid",
            pesan ? "true" : "false"
        );
    }

    if (error) {
        error.textContent = pesan;
        error.hidden = !pesan;
    }
}

// Menghapus semua pesan error
function hapusSemuaError(form) {
    if (!form) return;

    form.querySelectorAll(".field-error").forEach(error => {
        error.textContent = "";
        error.hidden = true;
    });

    form.querySelectorAll(".input-error").forEach(input => {
        input.classList.remove("input-error");
        input.removeAttribute("aria-invalid");
    });
}

// Validasi form lahan
export function validasiLahan() {
    const nama = document.getElementById("namaLahan").value.trim();
    const luas = document.getElementById("luasLahan").value;
    const lokasi = document.getElementById("lokasiLahan").value.trim();
    const status = document.getElementById("statusLahan").value;

    let valid = true;

    hapusSemuaError(document.getElementById("lahanForm"));

    if (!nama) {
        tampilkanError("namaLahan", "Nama lahan wajib diisi.");
        valid = false;
    }

    if (
        luas === "" ||
        !Number.isFinite(Number(luas)) ||
        Number(luas) <= 0
    ) {
        tampilkanError("luasLahan", "Luas lahan harus lebih dari 0.");
        valid = false;
    }

    if (!lokasi) {
        tampilkanError("lokasiLahan", "Lokasi lahan wajib diisi.");
        valid = false;
    }

    if (!status) {
        tampilkanError("statusLahan", "Status lahan wajib dipilih.");
        valid = false;
    }

    return valid;
}

// Validasi form tanaman
export function validasiTanaman(dataLahan = []) {
    const nama = document.getElementById("namaTanaman").value.trim();
    const jenis = document.getElementById("jenisTanaman").value;
    const lahan = document.getElementById("lahanTanaman").value;
    const tanggal = document.getElementById("tanggalTanam").value;
    const status = document.getElementById("statusTanaman").value;

    let valid = true;

    hapusSemuaError(document.getElementById("tanamanForm"));

    if (!nama) {
        tampilkanError("namaTanaman", "Nama tanaman wajib diisi.");
        valid = false;
    }

    if (!jenis) {
        tampilkanError("jenisTanaman", "Jenis tanaman wajib dipilih.");
        valid = false;
    }

    if (!lahan || !dataLahan.some(item => String(item.id) === lahan)) {
        tampilkanError("lahanTanaman", "Pilih lahan yang sudah terdaftar.");
        valid = false;
    }

    if (!tanggal) {
        tampilkanError("tanggalTanam", "Tanggal tanam wajib diisi.");
        valid = false;
    }

    if (!status) {
        tampilkanError("statusTanaman", "Status tanaman wajib dipilih.");
        valid = false;
    }

    return valid;
}
