"use client";

import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { jadwalService } from "../service/jadwal.service";

const schema = z.object({
    kelas: z.string().min(1, "Kelas wajib diisi"),
    tanggal: z.string().min(1, "Tanggal wajib diisi"),
    waktu_mulai: z.string().min(1, "Waktu mulai wajib diisi"),
    waktu_berakhir: z.string().min(1, "Waktu berakhir wajib diisi"),
    ruangan: z.string().min(1, "Ruangan wajib diisi"),
    jenis: z.string().min(1, "Jenis jadwal wajib dipilih"),
});

type JadwalDto = z.infer<typeof schema>;

export const useJadwal = () => {
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<
        Partial<Record<keyof JadwalDto, string>>
    >({});

    const createJadwal = async (data: JadwalDto) => {
        setErrors({});

        const result = schema.safeParse(data);

        if (!result.success) {
        const fieldErrors: Partial<
            Record<keyof JadwalDto, string>
        > = {};

        result.error.issues.forEach((err) => {
            const field = err.path[0] as keyof JadwalDto;

            if (!fieldErrors[field]) {
            fieldErrors[field] = err.message;
            }
        });

        setErrors(fieldErrors);

        toast.error("Periksa kembali form");
        return;
        }

        try {
        setLoading(true);

        await jadwalService.create(result.data);

        toast.success("Jadwal berhasil dibuat");
        } catch (err: any) {
        toast.error(
            err?.response?.data?.message ||
            "Gagal membuat jadwal"
        );
        } finally {
        setLoading(false);
        }
    };

    return {
        createJadwal,
        loading,
        errors,
    };
};