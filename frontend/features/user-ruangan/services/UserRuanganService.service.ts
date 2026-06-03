import { api } from "@/lib/axios"
import { UserRuanganTypes } from "../types/UserRuanganType.type"

export async function UserRuanganService(): Promise<UserRuanganTypes[]> {
  const response = await api.get("/api/user-ruangan")

  return response.data.data
}