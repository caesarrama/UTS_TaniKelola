
// Membuat elemen tabel
function buatSel(teks, className = "") {
    const sel = document.createElement("td");
    sel.textContent = teks ?? "—";

    if (className) {
        sel.className = className;
    }

    return sel;
}

// Membuat tombol Edit dan Hapus
function buatTombolAksi(id, jenis, label) {
    const tombol = document.createElement("button");

    tombol.type = "button";
    tombol.className = jenis === "edit"
        ? "action-button action-edit"
        : "action-button action-delete";

    if (jenis === "edit") {
        tombol.dataset.editLahan = id;
    }

    if (jenis === "hapus") {
        tombol.dataset.deleteLahan = id;
    }

    tombol.textContent = label;

    return tombol;
}

// Membuat baris ketika data kosong
function tampilkanBarisKosong(tbody, kolom, pesan) {
    const baris = document.createElement("tr");
    const sel = document.createElement("td");

    sel.colSpan = kolom;
    sel.className = "empty-cell";
    sel.textContent = pesan;

    baris.appendChild(sel);
    tbody.appendChild(baris);
}

// Format angka
function formatAngka(value) {
    return Number(value).toLocaleString("id-ID");
}

// Format tanggal
function formatTanggal(tanggal) {
    if (!tanggal) return "—";

    const [tahun, bulan, hari] = tanggal.split("-");
    return `${hari}/${bulan}/${tahun}`;
}

// Menampilkan data lahan
export function renderLahan(dataLahan) {
    const tbody = document.getElementById("lahanTableBody");
    if (!tbody) return;

    const search = document.getElementById("searchLahan");
    const kataKunci = search ? search.value.trim().toLowerCase() : "";

    const hasil = dataLahan.filter(lahan =>
        lahan.nama.toLowerCase().includes(kataKunci) ||
        lahan.lokasi.toLowerCase().includes(kataKunci) ||
        lahan.status.toLowerCase().includes(kataKunci)
    );

    const jumlah = document.getElementById("jumlahLahan");

    if (jumlah) {
        jumlah.textContent =
            `Menampilkan ${hasil.length} dari ${dataLahan.length} lahan`;
    }

    tbody.replaceChildren();

    if (hasil.length === 0) {
        tampilkanBarisKosong(
            tbody,
            6,
            dataLahan.length
                ? "Data lahan tidak ditemukan."
                : "Belum ada data lahan."
        );
        return;
    }

    hasil.forEach((lahan, index) => {
        const baris = document.createElement("tr");

        const nomor = buatSel(index + 1);
        const nama = buatSel(lahan.nama);
        const luas = buatSel(`${formatAngka(lahan.luas)} m²`);
        const lokasi = buatSel(lahan.lokasi);

        const status = document.createElement("td");
        const badge = document.createElement("span");

        badge.className = `status-badge ${
            lahan.status === "Aktif"
                ? "status-panen"
                : "status-selesai"
        }`;

        badge.textContent = lahan.status;
        status.appendChild(badge);

        const aksi = document.createElement("td");
        const grup = document.createElement("div");

        grup.className = "action-group";

        const tombolEdit = buatTombolAksi(
            lahan.id,
            "edit",
            "Edit"
        );

        const tombolHapus = buatTombolAksi(
            lahan.id,
            "hapus",
            "Hapus"
        );

        grup.append(tombolEdit, tombolHapus);
        aksi.appendChild(grup);

        baris.append(
            nomor,
            nama,
            luas,
            lokasi,
            status,
            aksi
        );

        tbody.appendChild(baris);
    });
}

// Menampilkan data tanaman
export function renderTanaman(dataTanaman, dataLahan) {
    const tbody = document.getElementById("tanamanTableBody");
    if (!tbody) return;

    const search = document.getElementById("searchTanaman");
    const kataKunci = search ? search.value.trim().toLowerCase() : "";

    const hasil = dataTanaman.filter(tanaman => {
        const lahan = dataLahan.find(
            item => item.id === tanaman.lahanId
        );

        return (
            tanaman.nama.toLowerCase().includes(kataKunci) ||
            tanaman.jenis.toLowerCase().includes(kataKunci) ||
            (lahan?.nama || "").toLowerCase().includes(kataKunci) ||
            tanaman.status.toLowerCase().includes(kataKunci)
        );
    });

    const jumlah = document.getElementById("jumlahTanaman");

    if (jumlah) {
        jumlah.textContent =
            `Menampilkan ${hasil.length} dari ${dataTanaman.length} tanaman`;
    }

    tbody.replaceChildren();

    if (hasil.length === 0) {
        tampilkanBarisKosong(
            tbody,
            7,
            dataTanaman.length
                ? "Data tanaman tidak ditemukan."
                : "Belum ada data tanaman."
        );
        return;
    }

    const kelasStatus = {
        Ditanam: "status-ditanam",
        Perawatan: "status-perawatan",
        Panen: "status-panen",
        Selesai: "status-selesai"
    };

    hasil.forEach((tanaman, index) => {
        const baris = document.createElement("tr");

        const lahan = dataLahan.find(
            item => item.id === tanaman.lahanId
        );

        const aksi = document.createElement("td");
        const grup = document.createElement("div");

        grup.className = "action-group";

        const tombolEdit = document.createElement("button");
        tombolEdit.type = "button";
        tombolEdit.className = "action-button action-edit";
        tombolEdit.dataset.editTanaman = tanaman.id;
        tombolEdit.textContent = "Edit";

        const tombolHapus = document.createElement("button");
        tombolHapus.type = "button";
        tombolHapus.className = "action-button action-delete";
        tombolHapus.dataset.deleteTanaman = tanaman.id;
        tombolHapus.textContent = "Hapus";

        grup.append(tombolEdit, tombolHapus);
        aksi.appendChild(grup);

        const status = document.createElement("td");
        const badge = document.createElement("span");

        badge.className = `status-badge ${
            kelasStatus[tanaman.status] || ""
        }`;

        badge.textContent = tanaman.status;
        status.appendChild(badge);

        baris.append(
            buatSel(index + 1),
            buatSel(tanaman.nama),
            buatSel(tanaman.jenis),
            buatSel(lahan?.nama || "Lahan tidak tersedia"),
            buatSel(formatTanggal(tanaman.tanggal)),
            status,
            aksi
        );

        tbody.appendChild(baris);
    });
}

// Menampilkan ringkasan dashboard
export function renderDashboard(dataLahan, dataTanaman) {
    const totalLahan = document.getElementById("totalLahan");
    const totalTanaman = document.getElementById("totalTanaman");
    const totalData = document.getElementById("totalData");

    if (totalLahan) {
        totalLahan.textContent = dataLahan.length;
    }

    if (totalTanaman) {
        totalTanaman.textContent = dataTanaman.length;
    }

    if (totalData) {
        totalData.textContent =
            dataLahan.length + dataTanaman.length;
    }

    // Menampilkan lima data lahan terbaru
    const tbody = document.getElementById("dashboardLahan");

    if (tbody) {
        tbody.replaceChildren();

        const terbaru = [...dataLahan].slice(-5).reverse();

        if (terbaru.length === 0) {
            tampilkanBarisKosong(
                tbody,
                3,
                "Belum ada data lahan."
            );
        } else {
            terbaru.forEach(lahan => {
                const baris = document.createElement("tr");

                baris.append(
                    buatSel(lahan.nama),
                    buatSel(`${formatAngka(lahan.luas)} m²`),
                    buatSel(lahan.lokasi)
                );

                tbody.appendChild(baris);
            });
        }
    }

    // Menampilkan lima data tanaman terbaru
    const daftarTanaman =
        document.getElementById("dashboardTanaman");

    if (daftarTanaman) {
        daftarTanaman.replaceChildren();

        const terbaru = [...dataTanaman].slice(-5).reverse();

        if (terbaru.length === 0) {
            const pesan = document.createElement("p");
            pesan.className = "empty-cell";
            pesan.textContent = "Belum ada data tanaman.";

            daftarTanaman.appendChild(pesan);
        } else {
            terbaru.forEach(tanaman => {
                const lahan = dataLahan.find(
                    item => item.id === tanaman.lahanId
                );

                const wrapper = document.createElement("div");
                wrapper.className = "crop-list-item";

                const emoji = document.createElement("div");
                emoji.className = "crop-emoji";
                emoji.textContent = "🌱";

                const info = document.createElement("div");
                info.className = "crop-info";

                const nama = document.createElement("strong");
                nama.textContent = tanaman.nama;

                const detail = document.createElement("small");
                detail.textContent =
                    lahan?.nama || "Lahan tidak tersedia";

                const status = document.createElement("span");
                status.className = "crop-type-tag";
                status.textContent = tanaman.status;

                info.append(nama, detail);
                wrapper.append(emoji, info, status);

                daftarTanaman.appendChild(wrapper);
            });
        }
    }
}
