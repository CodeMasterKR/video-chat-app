import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";
import { LoginDto, RegisterDto } from "../types/auth.types";
import { toast } from "sonner";

const setTokenCookie = (token: string) => {
  document.cookie = `access_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
};

const removeTokenCookie = () => {
  document.cookie = "access_token=; path=/; max-age=0";
};

export const useLogin = () => {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (dto: LoginDto) => authService.login(dto),
    onSuccess: async (data) => {
      setTokenCookie(data.access_token);
      setUser(data.user);
      toast.success("Xush kelibsiz!");
      await new Promise((r) => setTimeout(r, 100));
      router.replace("/chat");
    },
    onError: () => {
      toast.error("Email yoki parol noto'g'ri");
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (dto: RegisterDto) => authService.register(dto),
    onSuccess: async (data) => {
      setTokenCookie(data.access_token);
      setUser(data.user);
      toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
      await new Promise((r) => setTimeout(r, 100));
      router.replace("/chat");
    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const clearUser = useAuthStore((s) => s.clearUser);

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: async () => {
      removeTokenCookie();
      clearUser();
      await new Promise((r) => setTimeout(r, 100));
      router.replace("/login");
    },
  });
};