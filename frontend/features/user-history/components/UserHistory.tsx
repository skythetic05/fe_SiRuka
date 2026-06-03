"use client"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  History,
  CalendarDays,
  Clock3,
  Monitor,
  FileText,
} from "lucide-react"

import { useUserHistory } from "../hooks/useUserHistory"

export default function UserHistory() {
  const { data, loading } = useUserHistory()

  return (
    <div className="w-full pb-10">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-[40px] leading-none font-extrabold text-[#30418F]">
          History
        </h1>

        <p className="text-[#667085] mt-3 text-sm sm:text-base">
          Riwayat peminjaman ruangan yang pernah dilakukan.
        </p>
      </div>

      {/* CARD */}
      <Card className="
        w-full
        rounded-[30px]
        border border-[#EAECF0]
        shadow-sm
        overflow-hidden
        bg-white
      ">

        {/* TOP HEADER */}
        <div className="
          px-6 py-5
          bg-gradient-to-r
          from-[#30418F]
          to-[#4458B8]
          border-b
        ">
          <div className="flex items-center gap-4 text-white">

            <div className="
              w-12 h-12
              rounded-2xl
              bg-white/15
              flex items-center justify-center
            ">
              <History size={24} />
            </div>

            <div>
              <h2 className="font-bold text-xl">
                Riwayat Peminjaman
              </h2>

              <p className="text-sm text-white/80 mt-1">
                Data seluruh peminjaman yang telah Anda lakukan
              </p>
            </div>

          </div>
        </div>

        <CardContent className="p-0 bg-[#FAFBFC]">

          <div className="overflow-x-auto">
            <div className="max-h-[72vh] overflow-y-auto">

              <Table className="min-w-[1250px]">

                {/* HEADER */}
                <TableHeader className="sticky top-0 z-20 bg-white border-b">
                  <TableRow className="hover:bg-white">

                    <TableHead className="px-6 py-5 text-[#30418F] font-bold text-sm">
                      Nama
                    </TableHead>

                    <TableHead className="px-6 py-5 text-[#30418F] font-bold text-sm">
                      Kelas
                    </TableHead>

                    {/* RUANGAN (BARU) */}
                    <TableHead className="px-6 py-5 text-[#30418F] font-bold text-sm">
                      Ruangan
                    </TableHead>

                    <TableHead className="px-6 py-5 text-[#30418F] font-bold text-sm">
                      Tanggal
                    </TableHead>

                    <TableHead className="px-6 py-5 text-[#30418F] font-bold text-sm">
                      Mulai
                    </TableHead>

                    <TableHead className="px-6 py-5 text-[#30418F] font-bold text-sm">
                      Berakhir
                    </TableHead>

                    <TableHead className="px-6 py-5 text-[#30418F] font-bold text-sm">
                      Proyektor
                    </TableHead>

                    <TableHead className="px-6 py-5 text-[#30418F] font-bold text-sm">
                      Keterangan
                    </TableHead>

                    <TableHead className="px-6 py-5 text-[#30418F] font-bold text-sm">
                      Jenis
                    </TableHead>

                    <TableHead className="px-6 py-5 text-center text-[#30418F] font-bold text-sm">
                      Status
                    </TableHead>

                  </TableRow>
                </TableHeader>

                {/* BODY */}
                <TableBody>

                  {loading ? (

                    Array.from({ length: 8 }).map((_, index) => (
                      <TableRow key={index} className="border-b">

                        {Array.from({ length: 10 }).map((_, i) => (
                          <TableCell key={i} className="px-6 py-5">
                            <div className="h-10 rounded-2xl bg-[#EAECEF] animate-pulse" />
                          </TableCell>
                        ))}

                      </TableRow>
                    ))

                  ) : data.length === 0 ? (

                    <TableRow>
                      <TableCell colSpan={10} className="py-20">
                        <div className="flex flex-col items-center justify-center text-center">

                          <div className="
                            w-20 h-20
                            rounded-full
                            bg-[#EEF2FF]
                            flex items-center justify-center
                            mb-5
                          ">
                            <History size={36} className="text-[#30418F]" />
                          </div>

                          <h3 className="text-xl font-bold text-[#30418F]">
                            Belum Ada History
                          </h3>

                          <p className="text-sm text-[#667085] mt-2">
                            Data peminjaman akan muncul di sini
                          </p>

                        </div>
                      </TableCell>
                    </TableRow>

                  ) : (

                    data.map((item, index) => (
                      <TableRow
                        key={item.id}
                        className={`
                          border-b transition-all
                          hover:bg-[#F8FAFF]
                          ${index % 2 === 0 ? "bg-white" : "bg-[#FCFCFD]"}
                        `}
                      >

                        {/* NAMA */}
                        <TableCell className="px-6 py-5 font-semibold text-[#111827]">
                          {item.nama}
                        </TableCell>

                        {/* KELAS */}
                        <TableCell className="px-6 py-5">
                          <div className="inline-flex items-center justify-center min-w-[55px] px-3 py-1.5 rounded-xl bg-[#EEF2FF] text-[#30418F] text-xs font-bold">
                            {item.kelas}
                          </div>
                        </TableCell>

                        {/* RUANGAN */}
                        <TableCell className="px-6 py-5 font-medium text-[#374151]">
                          {item.ruangan}
                        </TableCell>

                        {/* TANGGAL */}
                        <TableCell className="px-6 py-5">
                          <div className="flex items-center gap-2 text-[#374151] font-medium">
                            <CalendarDays size={15} />
                            {new Date(item.tanggal).toLocaleDateString("id-ID")}
                          </div>
                        </TableCell>

                        {/* MULAI */}
                        <TableCell className="px-6 py-5">
                          <div className="flex items-center gap-2 font-medium text-[#374151]">
                            <Clock3 size={15} />
                            {item.waktu_mulai}
                          </div>
                        </TableCell>

                        {/* BERAKHIR */}
                        <TableCell className="px-6 py-5">
                          <div className="flex items-center gap-2 font-medium text-[#374151]">
                            <Clock3 size={15} />
                            {item.waktu_berakhir}
                          </div>
                        </TableCell>

                        {/* PROYEKTOR */}
                        <TableCell className="px-6 py-5">
                          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F3F4F6] text-[#374151] font-semibold text-sm">
                            <Monitor size={15} />
                            {item.kode_proyektor}
                          </div>
                        </TableCell>

                        {/* KETERANGAN */}
                        <TableCell className="px-6 py-5">
                          <div className="flex items-center gap-2 text-[#374151] font-medium max-w-[220px]">
                            <FileText size={15} />
                            <span className="truncate">{item.keterangan}</span>
                          </div>
                        </TableCell>

                        {/* JENIS */}
                        <TableCell className="px-6 py-5">
                          <span className={`
                            px-4 py-2 rounded-full text-xs font-bold
                            ${item.jenis_peminjaman === "TERJADWAL"
                              ? "bg-[#30418F]/10 text-[#30418F]"
                              : "bg-[#F4721E]/10 text-[#F4721E]"
                            }
                          `}>
                            {item.jenis_peminjaman === "TERJADWAL"
                              ? "Terjadwal"
                              : "Tidak Terjadwal"}
                          </span>
                        </TableCell>

                        {/* STATUS */}
                        <TableCell className="px-6 py-5 text-center">
                          <span className={`
                            inline-flex items-center justify-center min-w-[120px] px-4 py-2 rounded-full text-xs font-bold
                            ${item.status === "APPROVED"
                              ? "bg-green-100 text-green-700"
                              : item.status === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                            }
                          `}>
                            {item.status}
                          </span>
                        </TableCell>

                      </TableRow>
                    ))

                  )}

                </TableBody>

              </Table>

            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}