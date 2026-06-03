import { api } from "@/lib/axios"
import { History, HistoryStatus } from "../types/history.type"

export async function getHistories(): Promise<History[]> {
    const res = await api.get("/history")
    return res.data
}

export async function updateHistoryStatus(
    id: number,
    status: HistoryStatus
) {
    const res = await api.patch(`/history/${id}`, { status })
    return res.data
}

