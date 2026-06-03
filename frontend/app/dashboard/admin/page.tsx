"use client"

import { useAuth } from "@/features/auth/login/hooks/use-auth";
import Image from "next/image"

export default function HomePage() {
    const { isChecking } = useAuth();
    if (isChecking) return null; 
    return (
        <div className="h-[calc(100vh-64px)] relative overflow-hidden">

        {/* IMAGE*/}
        <div className="absolute inset-0 md:static md:w-[65%] md:h-full">
            <Image
            src="/kampus3.png"
            alt="Kampus"
            fill
            priority
            className="object-cover"
            />
        </div>

        {/* DESKTOP*/}
        <div className="hidden md:flex absolute right-0 top-0 h-full w-[35%] bg-[#F7F8FC] items-center pl-20">
            <div>
            <h1 className="text-[72px] font-extrabold text-[#2F3E8F] leading-tight">
                Hello!
                <br />
                Welcome
                <br />
                Back!
            </h1>

            <p className="mt-10 text-[40px] text-[#2F3E8F] [font-family:var(--font-inria)]">
                MinRuka
            </p>
            </div>
        </div>

        {/* MOBILE*/}
        <div className="
            md:hidden
            absolute
            bottom-0
            left-0
            w-full
            bg-white
            rounded-t-3xl
            p-6
            shadow-2xl
        ">
            <h1 className="text-[32px] font-extrabold text-[#2F3E8F] leading-tight">
            Hello!
            <br />
            Welcome
            <br />
            Back!
            </h1>

            <p className="mt-4 text-[22px] text-[#2F3E8F] [font-family:var(--font-inria)]">
            MinRuka
            </p>
        </div>

        </div>
    )
}