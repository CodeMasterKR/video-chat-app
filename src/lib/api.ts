import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_MOCKING === "enabled" 
    ? "" 
    : process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isAuthRequest = 
      error.config?.url?.includes("/auth/login") ||
      error.config?.url?.includes("/auth/register");

    if (error.response?.status === 401 && !isAuthRequest) {
      document.cookie = "access_token=; path=/; max-age=0";
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      document.cookie = "access_token=; path=/; max-age=0";
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);