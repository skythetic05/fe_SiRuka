"use client"

import { useState } from "react"

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
import { Skeleton } from "@/components/ui/skeleton"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

import { useUsers } from "../hooks/useMU"
import {
    Trash2,
    RotateCcw,
} from "lucide-react"

export default function MUTable() {
    const {
        users,
        loading,
        actionLoading,
        handleDelete,
        handleResetPassword,
    } = useUsers()

    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [resetId, setResetId] = useState<string | null>(null)
    

    return (
        <div>
        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-[#30418F] mb-8">
            Manajemen User
        </h1>

        {/* CARD */}
        <Card className="w-full rounded-2xl border border-gray-200 shadow-sm">
            <CardContent className="p-0">
            <div className="w-full overflow-x-auto">
                <div className="max-h-[60vh] overflow-y-auto">
                <Table className="min-w-[900px]">

                    {/* HEADER */}
                    <TableHeader className="sticky top-0 bg-white z-10 border-b">
                    <TableRow>
                        <TableHead className="px-6 py-4 text-[#30418F] font-semibold">
                        No
                        </TableHead>

                        <TableHead className="px-6 py-4 text-[#30418F] font-semibold">
                        Nama
                        </TableHead>

                        <TableHead className="px-6 py-4 text-[#30418F] font-semibold">
                        NPM/NIDN
                        </TableHead>

                        <TableHead className="px-6 py-4 text-[#30418F] font-semibold">
                        Email
                        </TableHead>

                        <TableHead className="px-6 py-4 text-[#30418F] font-semibold">
                        Role
                        </TableHead>

                        <TableHead className="px-6 py-4 text-center text-[#30418F] font-semibold">
                        Aksi
                        </TableHead>
                    </TableRow>
                    </TableHeader>

                    {/* BODY */}
                    <TableBody>

                    {/* LOADING */}
                    {loading &&
                        [...Array(5)].map((_, i) => (
                        <TableRow key={i}>
                            <TableCell colSpan={6}>
                            <Skeleton className="h-10 w-full" />
                            </TableCell>
                        </TableRow>
                        ))}

                    {/* DATA */}
                    {!loading &&
                        users.map((user, i) => (
                        <TableRow
                            key={user.id_user}
                            className={
                            i % 2 === 0
                                ? "bg-white"
                                : "bg-[#FAFAFA]"
                            }
                        >
                            {/* NO */}
                            <TableCell className="px-6 py-4">
                            {i + 1}
                            </TableCell>

                            {/* NAMA */}
                            <TableCell className="px-6 py-4 font-medium">
                            {user.nama}
                            </TableCell>

                            {/* NPM/NIDN */}
                            <TableCell className="px-6 py-4">
                            {user.npm_nidn}
                            </TableCell>

                            {/* EMAIL */}
                            <TableCell className="px-6 py-4">
                            {user.email}
                            </TableCell>

                            {/* ROLE */}
                            <TableCell className="px-6 py-4">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                user.role === "Mahasiswa"
                                    ? "bg-green-100 text-green-700"
                                    : user.role === "Dosen"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                            >
                                {user.role}
                            </span>
                            </TableCell>

                            {/* AKSI */}
                            <TableCell className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">

                                {/* DELETE */}
                                <Button
                                size="sm"
                                disabled={
                                    actionLoading === user.id_user
                                }
                                onClick={() =>
                                    setDeleteId(user.id_user)
                                }
                                className="h-8 px-3 rounded-md bg-[#F4721E] hover:bg-[#e46312]"
                                >
                                <Trash2 size={16} />
                                </Button>

                                {/* RESET PASSWORD */}
                                <Button
                                size="sm"
                                variant="default"
                                disabled={
                                    actionLoading === user.id_user
                                }
                                onClick={() =>
                                    setResetId(user.id_user)
                                }
                                className="h-8 px-3 rounded-md bg-[#30418F] hover:bg-[#26357a]"
                                >
                                <RotateCcw size={16} />
                                </Button>

                            </div>
                            </TableCell>
                        </TableRow>
                        ))}

                    {/* EMPTY UI */}
                    {!loading && users.length === 0 && (
                        <TableRow>
                        <TableCell
                            colSpan={6}
                            className="text-center py-10 text-gray-500"
                        >
                            Tidak ada data user
                        </TableCell>
                        </TableRow>
                    )}

                    </TableBody>
                </Table>
                </div>
            </div>
            </CardContent>
        </Card>

        {/* DIALOG HAPUS */}
        <Dialog
            open={deleteId !== null}
            onOpenChange={() => setDeleteId(null)}
        >
            <DialogContent className="sm:max-w-sm rounded-2xl p-6">
            <DialogHeader>
                <DialogTitle className="text-[#30418F] text-lg font-semibold">
                Konfirmasi Hapus User
                </DialogTitle>
            </DialogHeader>

            <DialogDescription className="text-sm text-gray-600 mt-2">
                Yakin ingin menghapus data user ini?
            </DialogDescription>

            <div className="flex justify-end gap-3 mt-6">
                <Button
                variant="outline"
                onClick={() => setDeleteId(null)}
                >
                Batal
                </Button>
                <Button
                className="bg-[#F4721E] hover:bg-[#e46312]"
                disabled={
                actionLoading === deleteId
                }
                onClick={async () => {

                if (deleteId) {
                    await handleDelete(deleteId)
                    setDeleteId(null)
                }
                }}
            >
                {actionLoading === deleteId
                ? "Menghapus..."
                : "Hapus"}
                </Button>
            </div>
            </DialogContent>
        </Dialog>
        {/* DIALOG RESET PASSWORD */}
        <Dialog
        open={resetId !== null}
        onOpenChange={() => setResetId(null)}
        >
        <DialogContent className="sm:max-w-sm rounded-2xl p-6">

            <DialogHeader>
            <DialogTitle className="text-[#30418F] text-lg font-semibold">
                Konfirmasi Reset Password
            </DialogTitle>
            </DialogHeader>

            <DialogDescription className="text-sm text-gray-600 mt-2">
            Yakin ingin mereset password user ini?
            <br />
            Password akan direset menjadi
            <span className="font-semibold text-[#30418F]">
                {" "}
                NPM/NIDN
            </span>
            </DialogDescription>

            <div className="flex justify-end gap-3 mt-6">

            <Button
                variant="outline"
                onClick={() => setResetId(null)}
            >
                Batal
            </Button>

            <Button
                className="bg-[#30418F] hover:bg-[#26357a]"
                disabled={
                actionLoading === resetId
                }
                onClick={async () => {

                if (resetId) {

                    await handleResetPassword(
                    resetId
                    )

                    setResetId(null)
                }
                }}
            >
                {actionLoading === resetId
                ? "Mereset..."
                : "Reset Password"}
            </Button>

            </div>
        </DialogContent>
        </Dialog>
        </div>
    )
}