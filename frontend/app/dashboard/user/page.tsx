"use client"

import { useAuth } from "@/features/auth/login/hooks/use-auth"
import Image from "next/image"

export default function HomePage() {
    const { isChecking } = useAuth()
    if (isChecking) return null

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-[#F4F6FF] via-white to-[#EEF2FF] overflow-hidden">

            {/* WRAPPER */}
            <div className="grid md:grid-cols-2 items-center min-h-[calc(100vh-64px)] px-6 md:px-14 lg:px-20 gap-10">

                {/* LEFT */}
                <div className="flex justify-center items-center">
                    <div className="relative w-full max-w-[620px] aspect-square">

                        {/* Glow */}
                        <div className="absolute inset-0 bg-[#2F3E8F]/10 blur-3xl rounded-full scale-90"></div>

                        {/* Image */}
                        <Image
                            src="/TI.png"
                            alt="Generation Teknik Informatika"
                            fill
                            priority
                            className="object-contain drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">

                    {/* Badge */}
                    <div className="mb-5 px-4 py-2 rounded-full bg-[#2F3E8F]/10 text-[#2F3E8F] font-semibold text-sm shadow-sm">
                        Sistem Informasi Ruangan
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-extrabold text-[#2F3E8F] leading-tight">
                        Hello,
                        <br />
                        Welcome
                        <br />
                        Back!
                    </h1>

                    {/* Description */}
                    <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                        Selamat datang kembali di aplikasi peminjaman ruangan.
                        Cek ketersediaan ruangan, lakukan peminjaman, dan lihat
                        riwayat peminjaman dengan mudah dan cepat.
                    </p>
                </div>
            </div>
        </div>
    )
}