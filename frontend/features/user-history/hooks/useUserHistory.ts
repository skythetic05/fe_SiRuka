"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"

import { UserHistoryType } from "../types/UserHistoryType.type"
import { UserHistoryService } from "../services/UserHistoryService.service"

export function useUserHistory() {
  const [data, setData] = useState<
    UserHistoryType[]
  >([])

  const [loading, setLoading] =
    useState(true)

  async function fetchData() {
    try {
      const res = await UserHistoryService()

      setData(res)
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Gagal mengambil history"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
  }
}