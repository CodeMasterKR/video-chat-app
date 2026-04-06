export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url: string | null;
  status: "ONLINE" | "OFFLINE" | "BUSY";
  created_at: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}