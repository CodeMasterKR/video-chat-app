import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api.types";
import { AuthResponse, LoginDto, RegisterDto } from "../types/auth.types";

export const authService = {
  login: async (dto: LoginDto) => {
    const res = await api.post<ApiResponse<AuthResponse>>("/auth/login", dto);
    return res.data.data;
  },

  register: async (dto: RegisterDto) => {
    const res = await api.post<ApiResponse<AuthResponse>>("/auth/register", dto);
    return res.data.data;
  },

  logout: async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("access_token");
  },

  me: async () => {
    const res = await api.get<ApiResponse<AuthResponse>>("/auth/me");
    return res.data.data;
  },
};