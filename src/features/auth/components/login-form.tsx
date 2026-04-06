"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "../hooks/use-auth";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Email noto'g'ri"),
  password: z.string().min(6, "Kamida 6 ta belgi"),
});

type FormData = z.infer<typeof schema>;

export const LoginForm = () => {
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => login(data);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.stopPropagation();
    handleSubmit(onSubmit)(e);
  };


  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <input
          {...register("password")}
          type="password"
          placeholder="Parol"
          className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}
      </div>

      {error && (
        <span className="text-red-500 text-sm">Email yoki parol noto'g'ri</span>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Kirish..." : "Kirish"}
      </Button>
    </form>
  );
};