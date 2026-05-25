import { api } from "@/lib/axios"
import { User } from "../types/MU.type"

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/api/manajemen")
  return res.data.data
}

type DeleteResponse = {
  message: string
}

export const deleteUser = async (
  id: string
): Promise<DeleteResponse> => {

  const res = await api.delete(
    `/api/manajemen/${id}`
  )

  return res.data
}