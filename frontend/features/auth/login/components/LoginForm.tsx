"use client";

import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const { login, loading, errors } = useLogin();
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        npm_nidn: "",
        password: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(form);
    };

    return (
        <div className="flex min-h-screen w-full flex-col md:flex-row font-sans overflow-x-hidden bg-white">

            {/* SISI KIRI*/}
            <div className="hidden md:flex relative w-[60%] flex-col justify-start p-12 lg:p-24 pt-16 lg:pt-20">

                {/* Background */}
                <img
                    src="/lab.jpg"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#30418F]/65 backdrop-blur-[2px]" />

                {/* Content */}
                <div className="relative z-10">
                    <div className="text-2xl font-bold mb-20 text-white">
                        SiRuka
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
                        Hello!<br />
                        Selamat<br />
                        Datang!
                    </h1>
                </div>
            </div>

            {/* SISI KANAN */}
            <div className="flex w-full md:w-[40%] flex-1 items-center justify-center p-6 sm:p-10 md:min-h-screen bg-[#30418F]">

                <div className="w-full max-w-[340px] sm:max-w-[380px] space-y-8 sm:space-y-10 text-center text-white py-10 md:py-0">

                    {/* Header */}
                    <div className="space-y-3">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                            Login
                        </h2>
                        <p className="text-sm sm:text-base font-light opacity-80 leading-relaxed">
                            Masukkan kredensial Anda untuk mengakses dashboard
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 text-left">

                        {/* NPM / NIDN */}
                        <div className="space-y-2">
                            <Label className="text-sm sm:text-base font-medium ml-1">
                                NPM/NIDN
                            </Label>
                            <Input
                                id="npm_nidn"
                                type="text"
                                value={form.npm_nidn}
                                // onChange digunakan untuk mendeteksi perubahan 
                                // nilai pada elemen input (
                                onChange={(e) =>
                                    setForm({ ...form, npm_nidn: e.target.value })
                                }
                                className="h-12 sm:h-14 w-full bg-white text-black text-sm sm:text-base border-[3px] rounded-xl sm:rounded-2xl focus-visible:ring-0"
                                style={{ borderColor: "#F4B539" }}
                            />
                            {errors.npm_nidn && (
                                <p className="text-xs text-red-500 ml-1">
                                    {errors.npm_nidn}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label className="text-sm sm:text-base font-medium ml-1">
                                Password
                            </Label>

                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={(e) =>
                                        setForm({ ...form, password: e.target.value })
                                    }
                                    className="h-12 sm:h-14 w-full pr-12 bg-white text-black text-sm sm:text-base border-[3px] rounded-xl sm:rounded-2xl focus-visible:ring-0"
                                    style={{ borderColor: "#F4B539" }}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="text-xs text-red-500 ml-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Button */}
                        <div className="flex justify-center md:justify-center pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-12 w-full md:w-48 rounded-2xl text-base sm:text-lg font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
                                style={{ backgroundColor: "#F4721E", color: "white" }}
                            >
                                {loading ? "Loading..." : "Login"}
                            </Button>
                        </div>
                    </form>

                    {/* Footer */}
                    <p className="text-xs sm:text-sm font-light">
                        Belum punya akun?{" "}
                        <span className="font-bold hover:underline">
                            <Link href="/register">Sign Up</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}