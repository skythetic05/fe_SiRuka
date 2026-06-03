"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Users, Building2 } from "lucide-react"
import { useUserRuangan } from "../hook/useUserRuangan"

export default function RuanganPage() {
    const { data, loading } = useUserRuangan()

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#30418F] tracking-tight">
                    Informasi Ruangan
                </h1>

                <p className="text-gray-500 text-base mt-1">
                    Detail kapasitas dan fasilitas setiap ruangan.
                </p>
            </div>

            {/* LOADING */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-8 h-8 border-4 border-[#30418F] border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

                    {data.map((item) => (
                        <Card
                            key={item.id_ruangan}
                            className="
                                overflow-hidden
                                rounded-2xl
                                border-0
                                bg-transparent
                                shadow-none
                                p-0
                            "
                        >

                            {/* HEADER CARD */}
                            <CardHeader className="bg-[#30418F] py-3 flex items-center justify-center border-0">
                                <CardTitle className="text-white text-2xl font-bold text-center">
                                    {item.nama_ruangan}
                                </CardTitle>
                            </CardHeader>

                            {/* CONTENT */}
                            <CardContent className="px-5 py-2 space-y-2 bg-transparent">

                                {/* KAPASITAS */}
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#EEF2FF] p-2 rounded-lg">
                                        <Users className="w-4 h-4 text-[#30418F]" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Kapasitas
                                        </p>
                                        <span className="text-sm font-semibold text-gray-700">
                                            {item.kapasitas} Orang
                                        </span>
                                    </div>
                                </div>

                                {/* FASILITAS */}
                                <div className="flex items-start gap-3">
                                    <div className="bg-[#EEF2FF] p-2 rounded-lg mt-1">
                                        <Building2 className="w-4 h-4 text-[#30418F]" />
                                    </div>

                                    <div className="w-full">
                                        <p className="text-xs text-gray-400">
                                            Fasilitas
                                        </p>

                                        <div className="flex flex-col gap-1 mt-1">
                                            {item.fasilitas.split(",").map((fasilitas: string, index: number) => (
                                                <div
                                                    key={index}
                                                    className="px-2 py-1 text-xs bg-[#EEF2FF] text-[#30418F] rounded-full font-medium w-fit"
                                                >
                                                    {fasilitas.trim()}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}