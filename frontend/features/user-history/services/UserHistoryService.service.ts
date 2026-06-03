import { api } from "@/lib/axios"
import { UserHistoryType } from "../types/UserHistoryType.type"

export async function UserHistoryService(): Promise<UserHistoryType[]> {
    const res = await api.get("/history/me")
    return res.data
}