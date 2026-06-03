"use client"

import UserNavbar from "@/components/navbaruser"
import { usePathname } from "next/navigation"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isHome = pathname === "/dashboard/user"

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <UserNavbar />

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
