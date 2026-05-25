
"use client"
import { useEffect, useState } from "react"
import { getUsers, deleteUser } from "../services/MU.service"
import { User } from "../types/MU.type"
import { toast } from "sonner"

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  async function fetchUsers() {
    try {
      const res = await getUsers()
      setUsers(res)
    } catch (error: any) {
      console.error(error)

      toast.error("Gagal mengambil data user", {
        description: error?.response?.data?.message || "Terjadi kesalahan",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    setActionLoading(id)

    try {
      await deleteUser(id)

      setUsers((prev) =>
        prev.filter((item) => item.id_user !== id)
      )

      toast.success("User berhasil dihapus")
    } catch (error: any) {
      console.error(error)

      toast.error("Gagal menghapus user", {
        description: error?.response?.data?.message || "Terjadi kesalahan",
      })
    } finally {
      setActionLoading(null)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    users,
    loading,
    actionLoading,
    handleDelete,
  }
}