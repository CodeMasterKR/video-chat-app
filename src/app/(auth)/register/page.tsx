import { RegisterForm } from "@/features/auth/components/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 border rounded-2xl shadow-sm flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Ro'yxatdan o'tish</h1>
          <p className="text-sm text-gray-500">Yangi akkaunt yarating</p>
        </div>

        <RegisterForm />

        <p className="text-sm text-center text-gray-500">
          Akkaunt bormi?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Kiring
          </Link>
        </p>
      </div>
    </div>
  );
}