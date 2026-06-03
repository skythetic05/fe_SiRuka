import { api } from "@/lib/axios";
import type { LoginDto, LoginResponse } from "../types/login.types";

export const loginService = {
  login: async (data: LoginDto): Promise<LoginResponse> => {
    const res = await api.post("/api/login", data);
    console.log("LOGIN RESPONSE RAW:", res);
    return res.data;
  },
};