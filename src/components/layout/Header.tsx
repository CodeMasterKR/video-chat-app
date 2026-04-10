"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/": "Asosiy",
  "/chat": "Xabarlar",
  "/call": "Qo'ng'iroqlar",
  "/contacts": "Kontaktlar",
  "/settings": "Sozlamalar",
};

export default function Header() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "VideoChat";

  return (
    <header style={{
      height: 56,
      background: "var(--color-background-primary)",
      borderBottom: "0.5px solid var(--color-border-tertiary)",
      display: "flex", alignItems: "center",
      padding: "0 24px",
      gap: 16,
      position: "sticky", top: 0, zIndex: 10,
    }}>
      {/* Page title */}
      <h1 style={{
        fontSize: 16, fontWeight: 500, margin: 0, flex: 1,
        color: "var(--color-text-primary)",
      }}>{title}</h1>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* New call */}
        <Link href="/call/new" style={{ textDecoration: "none" }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "6px 14px", borderRadius: 8, fontSize: 13,
            border: "0.5px solid var(--color-border-secondary)",
            background: "transparent", cursor: "pointer",
            color: "var(--color-text-primary)",
          }}>
            ☎ Qo'ng'iroq
          </button>
        </Link>

        {/* Notification */}
        <div style={{ position: "relative" }}>
          <button style={{
            width: 36, height: 36, borderRadius: 8,
            border: "0.5px solid var(--color-border-secondary)",
            background: "transparent", cursor: "pointer", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--color-text-secondary)",
          }}>🔔</button>
          <span style={{
            position: "absolute", top: 6, right: 6,
            width: 8, height: 8, borderRadius: "50%",
            background: "#ef4444",
            border: "1.5px solid var(--color-background-primary)",
          }} />
        </div>

        {/* Avatar */}
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "var(--color-background-success)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 500,
          color: "var(--color-text-success)", cursor: "pointer",
        }}>SZ</div>
      </div>
    </header>
  );
}