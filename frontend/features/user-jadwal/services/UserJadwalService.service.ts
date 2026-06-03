import { api } from "@/lib/axios";
import type {
  JadwalResponse,
  PeminjamanDto,
} from "../types/UserJadwalType.type";


export const jadwalUserService = {

  getAll: async (): Promise<Pick<JadwalResponse, "terjadwal">> => {
    const res = await api.get("/api/jadwal/terjadwal");
    return res.data;
  },

  getTidakTerjadwal: async (): Promise<Pick<JadwalResponse, "tidak_terjadwal">> => {
    const res = await api.get("/api/jadwal/tidak-terjadwal");

    return res.data;
  },
}

export const peminjamanUserService = {
  create: async (data: PeminjamanDto) => {
    const res = await api.post("/peminjaman", data);
    return res.data;
  },
};