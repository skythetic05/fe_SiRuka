import { api } from "@/lib/axios"
import { User } from "../types/MU.type"


export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/api/manajemen")
  return res.data
}

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/api/manajemen/${id}`)
}