import { LoginForm } from "@/features/auth/components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 border rounded-2xl shadow-sm flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Kirish</h1>
          <p className="text-sm text-gray-500">Akkauntingizga kiring</p>
        </div>

        <LoginForm />

        <p className="text-sm text-center text-gray-500">
          Akkaunt yo'qmi?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Ro'yxatdan o'ting
          </Link>
        </p>
      </div>
    </div>
  );
}