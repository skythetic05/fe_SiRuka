"use client"

import Navbar from "@/components/navbar"
import { usePathname } from "next/navigation"

export default function AdminLayout({
    children,
    }: {
    children: React.ReactNode
    }) {
        const pathname = usePathname()

        const isHome = pathname === "/dashboard/admin"

        return (
            <div className="min-h-screen bg-[#F9FAFB]">
            <Navbar />

            {isHome ? (
                <main>{children}</main>
            ) : (
                <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
                {children}
                </main>
            )}
            </div>
        )
}