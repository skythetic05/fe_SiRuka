export type JenisPeminjaman = "TERJADWAL" | "TIDAK_TERJADWAL";

export type StatusKotak = "TERJADWAL" | "TIDAK_TERJADWAL" | "KOSONG";


export type Jadwal = {
  id_jadwal: number;
  kelas: string;
  ruangan: string;
  tanggal: string;      
  waktu_mulai: string;   
  waktu_berakhir: string;
};


export type JadwalTidakTerjadwal = {
  id_jadwal: number;
  kelas: string;
  ruangan: string;
  tanggal: string;      
  waktu_mulai: string;
  waktu_berakhir: string;
};


export type PeminjamanDto = {
  nama: string;
  kelas: string;
  tanggal: string;
  ruangan: string;
  waktu_mulai: string;
  waktu_berakhir: string;
  kode_proyektor: string;
  keterangan: string;
  jenis_peminjaman: JenisPeminjaman;
};

export type FormPeminjaman = PeminjamanDto & {
  kelas_jadwal?: string;
};

export type CellContext = {
  ruangan: string;
  waktu_mulai: string;
  waktu_berakhir: string;
  jenis: JenisPeminjaman;
  kelas_jadwal?: string; 
};


export type JadwalResponse = {
  terjadwal: Jadwal[];
  tidak_terjadwal: JadwalTidakTerjadwal[];
};