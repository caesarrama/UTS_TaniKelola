
const STORAGE_LAHAN = "taniKelolaLahan";
const STORAGE_TANAMAN = "taniKelolaTanaman";

// Membaca data dari localStorage
export function bacaData(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

// Menyimpan data lahan dan tanaman
export function simpanData(dataLahan, dataTanaman) {
    localStorage.setItem(
        STORAGE_LAHAN,
        JSON.stringify(dataLahan)
    );

    localStorage.setItem(
        STORAGE_TANAMAN,
        JSON.stringify(dataTanaman)
    );
}

// Membuat ID unik
export function buatId() {
    return Date.now().toString() +
        Math.random().toString(36).slice(2, 7);
}

// Mengambil data lahan
export function ambilDataLahan() {
    return bacaData(STORAGE_LAHAN);
}

// Mengambil data tanaman
export function ambilDataTanaman() {
    return bacaData(STORAGE_TANAMAN);
}
