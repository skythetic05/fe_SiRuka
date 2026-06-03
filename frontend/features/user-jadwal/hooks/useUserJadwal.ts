"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import {
  jadwalUserService,
  peminjamanUserService,
} from "../services/UserJadwalService.service";

import type {
  CellContext,
  FormPeminjaman,
  Jadwal,
  JadwalTidakTerjadwal,
} from "../types/UserJadwalType.type";


const HARI_MAP: Record<string, number> = {
  Minggu: 0,
  Senin: 1,
  Selasa: 2,
  Rabu: 3,
  Kamis: 4,
  Jumat: 5,
  Sabtu: 6,
};

const HARI_INDONESIA = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const TABS_HARI = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];


const PROYEKTOR_MAP: Record<string, string> = {
  M09: "P-M09",
  M10: "P-M10",
  M11: "P-M11",
  M12: "P-M12",
  M38: "P-M38",
  M39: "P-M39",
  M40: "P-M40",
  M41: "P-M41",
};

const peminjamanSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  kelas: z.string().min(1, "Kelas wajib diisi"),
  tanggal: z.string().min(1, "Tanggal wajib diisi"),
  ruangan: z.string().min(1, "Ruangan wajib diisi"),
  waktu_mulai: z.string().min(1, "Waktu mulai wajib diisi"),
  waktu_berakhir: z.string().min(1, "Waktu berakhir wajib diisi"),
  kode_proyektor: z.string().min(1, "Kode proyektor wajib diisi"),
  keterangan: z.string().min(1, "Keterangan wajib diisi"),
  jenis_peminjaman: z.enum(["TERJADWAL", "TIDAK_TERJADWAL"]),
});

type FormErrors = Partial<Record<keyof FormPeminjaman, string>>;


function toMenit(waktu: string): number {
  const [jam, menit] = waktu
    .replace(".", ":")
    .split(":")
    .map(Number);

  return jam * 60 + (menit || 0);
}


function getNamaHariDariTanggal(tanggal: string): string {
  const date = new Date(tanggal + "T00:00:00");
  return HARI_INDONESIA[date.getDay()];
}


function getTanggalDariHari(
  namaHari: string,
  hariMap: Record<string, number>
): string {
  const sekarang = new Date();

  const currentDay = sekarang.getDay();
  const targetDay = hariMap[namaHari];

  let diff = targetDay - currentDay;

  if (diff < 0) diff += 7;

  const targetDate = new Date(sekarang);

  targetDate.setDate(sekarang.getDate() + diff);

  return targetDate.toISOString().split("T")[0];
}


export function useJadwalUser() {
    // tab hari 
    const hariSekarang = HARI_INDONESIA[new Date().getDay()];

    const defaultHari = TABS_HARI.includes(hariSekarang)
        ? hariSekarang
        : "Senin";

    const [selectedHari, setSelectedHari] =
        useState<string>(defaultHari);

    // jadwal terjadwal & tidak terjadwal
    const [jadwalTerjadwal, setJadwalTerjadwal] =
        useState<Jadwal[]>([]);

    const [jadwalTidakTerjadwal, setJadwalTidakTerjadwal] =
        useState<JadwalTidakTerjadwal[]>([]);

    const [loadingJadwal, setLoadingJadwal] =
        useState(false);

    // modal & cell context
    const [modalOpen, setModalOpen] = useState(false);

    const [cellContext, setCellContext] =
        useState<CellContext | null>(null);

    // form peminjaman
    const [form, setForm] = useState<FormPeminjaman>({
        nama: "",
        kelas: "",
        tanggal: "",
        ruangan: "",
        waktu_mulai: "",
        waktu_berakhir: "",
        kode_proyektor: "",
        keterangan: "",
        jenis_peminjaman: "TIDAK_TERJADWAL",
    });

    const [formErrors, setFormErrors] =
        useState<FormErrors>({});

    const [loadingSubmit, setLoadingSubmit] =
        useState(false);

    // tanggal terpilih
    const tanggalDipilih = useMemo(
        () =>
        getTanggalDariHari(
            selectedHari,
            HARI_MAP
        ),
        [selectedHari]
    );

    // fetch jadwal terjadwal
    const fetchJadwalTerjadwal = useCallback(async () => {
        setLoadingJadwal(true);

        try {
        const res = await jadwalUserService.getAll();

        setJadwalTerjadwal(res.terjadwal);
        } catch (err: any) {
        toast.error(
            err?.response?.data?.message ||
            "Gagal mengambil data jadwal"
        );
        } finally {
        setLoadingJadwal(false);
        }
    }, []);

    // fetch jadwal tidak terjadwal
    const fetchJadwalTidakTerjadwal =
    useCallback(async () => {
        try {
        const res =
            await jadwalUserService.getTidakTerjadwal();
        console.log("RES:", res);
        console.log("DATA:", res.tidak_terjadwal);

        setJadwalTidakTerjadwal(
        Array.isArray(res?.tidak_terjadwal)
            ? res.tidak_terjadwal
            : []
        );
        } catch (err: any) {
        toast.error(
            err?.response?.data?.message ||
            "Gagal mengambil jadwal tidak terjadwal"
        );
        }
    }, []);

    useEffect(() => {
        fetchJadwalTerjadwal();
    }, [fetchJadwalTerjadwal]);

    useEffect(() => {
        fetchJadwalTidakTerjadwal();
    }, [fetchJadwalTidakTerjadwal]);


    const jadwalHariIni = useMemo(
        () =>
        jadwalTerjadwal.filter(
            (j) =>
            getNamaHariDariTanggal(
                j.tanggal
            ) === selectedHari
        ),
        [jadwalTerjadwal, selectedHari]
    );

    const jadwalTidakTerjadwalAktif = useMemo(() => {
        const sekarang = new Date();

        const jamSekarangMenit =
            sekarang.getHours() * 60 +
            sekarang.getMinutes();

        const tanggalHariIni =
            sekarang.toISOString().split("T")[0];

        return (jadwalTidakTerjadwal || []).filter((j) =>  {
            const namaHariJadwal =
                getNamaHariDariTanggal(j.tanggal);

            if (namaHariJadwal !== selectedHari) {
                return false;
            }

            const tanggalPinjam = new Date(j.tanggal + "T00:00:00");

            const hariIni = new Date(tanggalHariIni + "T00:00:00");

            const selisihHari = Math.ceil(
                (tanggalPinjam.getTime() - hariIni.getTime()) /
                (1000 * 60 * 60 * 24)
            );

            let tanggalMuncul = new Date(tanggalPinjam);

            // Jika H-1 atau kurang => langsung tampil
            if (selisihHari <= 1) {
                tanggalMuncul = hariIni;
            } else {
                // Cari hari Minggu sebelum tanggal peminjaman
                while (tanggalMuncul.getDay() !== 0) {
                    tanggalMuncul.setDate(
                        tanggalMuncul.getDate() - 1
                    );
                }
            }

            const tanggalMunculStr =
                tanggalMuncul.toISOString().split("T")[0];

            if (tanggalHariIni < tanggalMunculStr) {
                return false;
            }

            if (j.tanggal > tanggalHariIni) {
                return true;
            }

            if (j.tanggal === tanggalHariIni) {
                return (
                    toMenit(j.waktu_berakhir) >
                    jamSekarangMenit
                );
            }

            return false;
        });
    }, [jadwalTidakTerjadwal, selectedHari]);

    // range waktu 
    const isInRange = (
        waktu: string,
        waktu_mulai: string,
        waktu_berakhir: string
    ) => {
        const w = toMenit(waktu);

        const mulai = toMenit(waktu_mulai);

        const berakhir = toMenit(waktu_berakhir);

        return w >= mulai && w <= berakhir;
    };


    const getCellJadwal = useCallback(
        (ruangan: string, waktu: string) => {
        const terjadwal = jadwalHariIni.find(
            (j) =>
            j.ruangan === ruangan &&
            isInRange(
                waktu,
                j.waktu_mulai,
                j.waktu_berakhir
            )
        );

        if (terjadwal)
            return {
            jadwal: terjadwal,
            tipe: "TERJADWAL" as const,
            isStart:
                terjadwal.waktu_mulai === waktu,
            };

        const tidakTerjadwal =
            jadwalTidakTerjadwalAktif.find(
            (j) =>
                j.ruangan === ruangan &&
                isInRange(
                waktu,
                j.waktu_mulai,
                j.waktu_berakhir
                )
            );

        if (tidakTerjadwal)
            return {
            jadwal: tidakTerjadwal,
            tipe: "TIDAK_TERJADWAL" as const,
            isStart:
                tidakTerjadwal.waktu_mulai ===
                waktu,
            };

        return null;
        },
        [
        jadwalHariIni,
        jadwalTidakTerjadwalAktif,
        ]
    );

    const handleOpenForm = useCallback(
        (ruangan: string, waktu_mulai: string) => {
        const cell = getCellJadwal(
            ruangan,
            waktu_mulai
        );


        if (cell) {
            const kodeProyektor =
            PROYEKTOR_MAP[cell.jadwal.ruangan] ||
            "";

            const ctx: CellContext = {
            ruangan: cell.jadwal.ruangan,
            waktu_mulai:
                cell.jadwal.waktu_mulai,
            waktu_berakhir:
                cell.jadwal.waktu_berakhir,
            jenis: cell.tipe,
            kelas_jadwal: cell.jadwal.kelas,
            };

            setCellContext(ctx);

            setForm({
            nama: "",
            kelas: cell.jadwal.kelas,
            tanggal: tanggalDipilih,
            ruangan: cell.jadwal.ruangan,
            waktu_mulai:
                cell.jadwal.waktu_mulai,
            waktu_berakhir:
                cell.jadwal.waktu_berakhir,

            kode_proyektor: kodeProyektor,

            keterangan: "",
            jenis_peminjaman: cell.tipe,
            kelas_jadwal:
                cell.jadwal.kelas,
            });
        }
        else {
            const kodeProyektor =
            PROYEKTOR_MAP[ruangan] || "";

            const ctx: CellContext = {
            ruangan,
            waktu_mulai,
            waktu_berakhir: "",
            jenis: "TIDAK_TERJADWAL",
            };

            setCellContext(ctx);

            setForm({
            nama: "",
            kelas: "",
            tanggal: tanggalDipilih,
            ruangan,
            waktu_mulai,
            waktu_berakhir: "",
            kode_proyektor: kodeProyektor,

            keterangan: "",
            jenis_peminjaman:
                "TIDAK_TERJADWAL",
            kelas_jadwal: undefined,
            });
        }

        setFormErrors({});
        setModalOpen(true);
        },
        [getCellJadwal, tanggalDipilih]
    );
    const handleCloseModal = useCallback(() => {
        setModalOpen(false);

        setCellContext(null);

        setFormErrors({});
    }, []);


    const handleFormChange = useCallback(
        (
        field: keyof FormPeminjaman,
        value: string
        ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));

        setFormErrors((prev) => ({
            ...prev,
            [field]: undefined,
        }));
        },
        []
    );


    const validateBentrok = useCallback(
        (data: FormPeminjaman): string | null => {
        if (
            data.jenis_peminjaman ===
            "TERJADWAL"
        ) {
            if (
            data.kelas_jadwal &&
            data.kelas
                .trim()
                .toUpperCase() !==
                data.kelas_jadwal
                .trim()
                .toUpperCase()
            ) {
            return `Kelas tidak sesuai. Jadwal ini untuk kelas ${data.kelas_jadwal}.`;
            }
        }

        if (
            data.jenis_peminjaman ===
            "TIDAK_TERJADWAL"
        ) {
            const isBentrok =
            jadwalTidakTerjadwalAktif.some(
                (j) =>
                j.tanggal === data.tanggal &&
                j.waktu_mulai ===
                    data.waktu_mulai &&
                j.waktu_berakhir ===
                    data.waktu_berakhir &&
                j.kelas
                    .trim()
                    .toUpperCase() !==
                    data.kelas
                    .trim()
                    .toUpperCase()
            );

            if (isBentrok) {
            return "Jadwal bentrok dengan peminjaman tidak terjadwal lain.";
            }
        }

        return null;
        },
        [jadwalTidakTerjadwalAktif]
    );


    const handleSubmit = useCallback(async () => {
        setFormErrors({});

        const { kelas_jadwal, ...payload } =
        form;

        const result =
        peminjamanSchema.safeParse(
            payload
        );

        if (!result.success) {
        const fieldErrors: FormErrors = {};

        result.error.issues.forEach((err) => {
            const field =
            err.path[0] as keyof FormPeminjaman;

            if (!fieldErrors[field]) {
            fieldErrors[field] = err.message;
            }
        });

        setFormErrors(fieldErrors);

        toast.error(
            "Periksa kembali form sebelum menyimpan."
        );

        return;
        }

        const bentrokMsg =
        validateBentrok(form);

        if (bentrokMsg) {
        toast.error(bentrokMsg);
        return;
        }

        try {
        setLoadingSubmit(true);

        await peminjamanUserService.create(result.data);

        toast.success(
            "Peminjaman berhasil diajukan. Menunggu persetujuan admin."
        );

        handleCloseModal();

        fetchJadwalTidakTerjadwal();
        } catch (err: any) {
        const msg =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Gagal mengajukan peminjaman. Coba lagi.";

        toast.error(msg);
        } finally {
        setLoadingSubmit(false);
        }
    }, [
        form,
        validateBentrok,
        handleCloseModal,
        fetchJadwalTidakTerjadwal,
    ]);


    return {
        tabsHari: TABS_HARI,
        selectedHari,
        setSelectedHari,
        tanggalDipilih,
        loadingJadwal,
        jadwalHariIni,
        jadwalTidakTerjadwalAktif,
        getCellJadwal,
        modalOpen,
        cellContext,
        form,
        formErrors,
        loadingSubmit,
        handleOpenForm,
        handleCloseModal,
        handleFormChange,
        handleSubmit,
    };
}