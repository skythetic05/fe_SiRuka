export type HistoryStatus = "PENDING" | "APPROVED" | "REJECTED"
export type JenisPeminjaman = "TERJADWAL" | "TIDAK_TERJADWAL"

export type UserHistoryType = {
    id: number;
    nama: string;
    kelas: string;
    ruangan: string;
    tanggal: string;
    waktu_mulai: string;
    waktu_berakhir: string;
    kode_proyektor: string;
    keterangan: string;
    jenis_peminjaman: JenisPeminjaman;
    status: HistoryStatus;
}