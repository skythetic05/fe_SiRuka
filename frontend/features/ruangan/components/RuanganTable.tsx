"use client"

import { useState } from "react"
import { useRuangan } from "../hook/useRuangan"
import { Ruangan } from "../types/Ruangan.type"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Pencil, Trash2 } from "lucide-react"

export default function RuanganTable() {
    const { data, loading, handleDelete, handleUpdate, actionLoading } =
        useRuangan()

    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<Ruangan | null>(null)
    const [deleteId, setDeleteId] = useState<number | null>(null)

    const [form, setForm] = useState({
        nama_ruangan: "",
        kapasitas: 0,
        fasilitas: "",
    })

    function openEdit(item: Ruangan) {
        setSelected(item)
        setForm({
        nama_ruangan: item.nama_ruangan,
        kapasitas: item.kapasitas,
        fasilitas: item.fasilitas,
        })
        setOpen(true)
    }

    async function handleSubmit() {
        if (!selected) return

        // VALIDASI
        if (!form.nama_ruangan.trim()) {
            toast.error("Nama ruangan tidak boleh kosong")
            return
        }

        if (!form.fasilitas.trim()) {
            toast.error("Fasilitas tidak boleh kosong")
            return
        }

        if (!form.kapasitas || form.kapasitas <= 0) {
            toast.error("Kapasitas harus lebih dari 0")
            return
        }

        await handleUpdate(selected.id_ruangan, form)
        setOpen(false)
    }

    return (
        <div>
        <h1 className="text-2xl font-semibold text-[#30418F] mb-8">
            Ruangan
        </h1>

        <Card className="w-full rounded-2xl border shadow-sm">
            <CardContent className="p-0">
            <div className="overflow-x-auto">
                <div className="max-h-[60vh] overflow-y-auto">
                <Table className="min-w-[800px]">

                    {/* HEADER */}
                    <TableHeader className="sticky top-0 bg-white z-10 border-b">
                    <TableRow>
                        <TableHead className="px-6 py-4 text-[#30418F] font-semibold">No</TableHead>
                        <TableHead className="px-6 py-4 text-[#30418F] font-semibold">Ruangan</TableHead>
                        <TableHead className="px-6 py-4 text-[#30418F] font-semibold">Fasilitas</TableHead>
                        <TableHead className="px-6 py-4 text-[#30418F] font-semibold">Kapasitas</TableHead>
                        <TableHead className="px-6 py-4 text-[#30418F] font-semibold text-center">Aksi</TableHead>
                    </TableRow>
                    </TableHeader>

                    {/* BODY */}
                    <TableBody>
                    {loading ? (
                        <TableRow>
                        <TableCell colSpan={5} className="text-center py-10">
                            Loading...
                        </TableCell>
                        </TableRow>
                    ) : data.length === 0 ? (
                        <TableRow>
                        <TableCell colSpan={5} className="text-center py-10">
                            Tidak ada data
                        </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item, i) => (
                        <TableRow
                            key={item.id_ruangan}
                            className={i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}
                        >
                            <TableCell className="px-6 py-4">{i + 1}</TableCell>
                            <TableCell className="px-6 py-4">
                            {item.nama_ruangan}
                            </TableCell>
                            <TableCell className="px-6 py-4">
                            {item.fasilitas}
                            </TableCell>
                            <TableCell className="px-6 py-4">
                            {item.kapasitas}
                            </TableCell>

                            <TableCell className="px-6 py-4">
                            <div className="flex justify-center gap-2">
                                <Button
                                size="sm"
                                className="h-8 px-4 rounded-md text-xs font-semibold bg-[#F4721E] text-white hover:bg-[#e46312]"
                                disabled={actionLoading === item.id_ruangan}
                                onClick={() => setDeleteId(item.id_ruangan)}
                                >
                                <Trash2 size={16} />
                                </Button>
                            
                                <Button
                                size="sm"
                                className="h-8 px-4 rounded-md text-xs font-semibold bg-[#30418F] text-white hover:bg-[#23306d]"
                                onClick={() => openEdit(item)}
                                >
                                <Pencil size={16} />
                                </Button>
                            </div>
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

        {/* MODAL */}
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md rounded-2xl p-6">
                <DialogHeader>
                <DialogTitle className="text-[#30418F] text-xl font-semibold">
                    Edit Ruangan
                </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-5 mt-4">

                {/* NAMA RUANGAN */}
                <div>
                    <label className="text-sm text-[#30418F] font-medium mb-1 block">
                    Ruangan
                    </label>
                    <input
                    value={form.nama_ruangan}
                    onChange={(e) =>
                        setForm({ ...form, nama_ruangan: e.target.value })
                    }
                    className="w-full h-12 px-4 rounded-full border-2 border-orange-400 outline-none focus:border-orange-500"
                    />
                </div>

                {/* FASILITAS */}
                <div>
                    <label className="text-sm text-[#30418F] font-medium mb-1 block">
                    Fasilitas
                    </label>
                    <input
                    value={form.fasilitas}
                    onChange={(e) =>
                        setForm({ ...form, fasilitas: e.target.value })
                    }
                    className="w-full h-12 px-4 rounded-full border-2 border-orange-400 outline-none focus:border-orange-500"
                    />
                </div>

                {/* KAPASITAS */}
                <div>
                    <label className="text-sm text-[#30418F] font-medium mb-1 block">
                    Kapasitas
                    </label>
                    <input
                    type="number"
                    value={form.kapasitas}
                    onChange={(e) =>
                        setForm({ ...form, kapasitas: Number(e.target.value) })
                    }
                    className="w-full h-12 px-4 rounded-full border-2 border-orange-400 outline-none focus:border-orange-500"
                    />
                </div>

                {/* BUTTON */}
                <Button
                    onClick={handleSubmit}
                    className="w-full h-12 rounded-full bg-[#3B4A8F] text-lg font-semibold hover:bg-[#2f3d7a]"
                    disabled={actionLoading === selected?.id_ruangan}
                >
                    Simpan
                </Button>

                </div>
            </DialogContent>
        </Dialog>
        <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
            <DialogContent className="sm:max-w-sm rounded-2xl p-6">
                <DialogHeader>
                <DialogTitle className="text-[#30418F] text-lg font-semibold">
                    Konfirmasi Hapus
                </DialogTitle>
                </DialogHeader>

                <p className="text-sm text-gray-600 mt-2">
                Yakin ingin menghapus data ini?
                </p>

                <div className="flex justify-end gap-3 mt-6">
                <Button
                    variant="outline"
                    onClick={() => setDeleteId(null)}
                >
                    Batal
                </Button>

                <Button
                    className="bg-[#F4721E] hover:bg-[#e46312]"
                    onClick={async () => {
                    if (deleteId) {
                        await handleDelete(deleteId)
                        setDeleteId(null)
                    }
                    }}
                >
                    Hapus
                </Button>
                </div>
            </DialogContent>
        </Dialog>
        </div>
    )
}