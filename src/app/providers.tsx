"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { useEffect, useState } from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(
    process.env.NEXT_PUBLIC_API_MOCKING !== "enabled"
  );

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING !== "enabled") return;

    import("@/lib/msw").then(({ initMSW }) =>
      initMSW().then(() => setReady(true))
    );
  }, []);

  if (!ready) return null;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};