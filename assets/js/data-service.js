// =====================================
// KONSTANTA PENYIMPANAN
// =====================================

const STORAGE_LAHAN = "taniKelolaLahan";
const STORAGE_TANAMAN = "taniKelolaTanaman";
const STORAGE_LOGIN = "taniKelolaLogin";


// =====================================
// MEMBACA DATA
// =====================================

export function bacaData(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key));

        return Array.isArray(data) ? data : [];

    } catch {
        return [];
    }
}


// =====================================
// MENYIMPAN DATA LAHAN DAN TANAMAN
// =====================================

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


// =====================================
// MEMBUAT ID UNIK
// =====================================

export function buatId() {
    return Date.now().toString() +
        Math.random().toString(36).slice(2, 7);
}


// =====================================
// MENGAMBIL DATA LAHAN
// =====================================

export function ambilDataLahan() {
    return bacaData(STORAGE_LAHAN);
}


// =====================================
// MENGAMBIL DATA TANAMAN
// =====================================

export function ambilDataTanaman() {
    return bacaData(STORAGE_TANAMAN);
}


// =====================================
// SISTEM LOGIN
// =====================================

// Menyimpan status login
export function simpanStatusLogin(username) {
    sessionStorage.setItem(STORAGE_LOGIN, username);
}


// Memeriksa status login
export function cekStatusLogin() {
    return sessionStorage.getItem(STORAGE_LOGIN) !== null;
}


// Menghapus status login
export function hapusStatusLogin() {
    sessionStorage.removeItem(STORAGE_LOGIN);
}