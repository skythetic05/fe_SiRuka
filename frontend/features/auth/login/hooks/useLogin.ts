"use client";

import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { loginService } from "../services/login.service";
import { authService } from "../services/auth.service";
import { useRouter } from "next/navigation";

const schema = z.object({
    npm_nidn: z.string().min(1, "NPM/NIDN wajib diisi"),
    password: z.string().min(1, "Password wajib diisi"),
});

type LoginDto = z.infer<typeof schema>;

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<
        Partial<Record<keyof LoginDto, string>>
    >({});
    const router = useRouter();

    const login = async (data: LoginDto) => {
        setErrors({});

        // validasi
        const result = schema.safeParse(data);
        if (!result.success) {
            const fieldErrors: typeof errors = {};
            result.error.issues.forEach((err) => {
                const field = err.path[0] as keyof LoginDto;
                fieldErrors[field] = err.message;
            });
            setErrors(fieldErrors);
            toast.error("Periksa kembali form");
            return;
        }

        try {
            setLoading(true);

            const res = await loginService.login(result.data);

            console.log("LOGIN RESPONSE:", res);

            const token = res?.token;
            const user = res?.user;
            
            // Validasi
            if (!token || !user) {
                console.log("FULL RESPONSE DEBUG:", res);
                toast.error("Token / user tidak ditemukan");
                return;
            }
            // simpan Token
            authService.setToken(token);
            authService.setUser(user);

            toast.success("Login berhasil");

            // Redirect ke dashbard seuai role
            if (user.role === "admin") {
                router.push("/dashboard/admin");
            } else if (user.role === "dosen" || user.role === "mahasiswa") {
                router.push("/dashboard/user");
            } else {
                router.push("/");
            }

        } catch (err: any) {
            console.log("LOGIN ERROR FULL:", err?.response?.data || err);

            toast.error(
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Login gagal"
            );
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, errors };
};