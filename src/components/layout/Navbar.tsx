"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", icon: "⊞", label: "Asosiy" },
  { href: "/chat", icon: "✉", label: "Chat", badge: 3 },
  { href: "/call", icon: "☎", label: "Call", badge: 1 },
  { href: "/contacts", icon: "👤", label: "Kontakt" },
  { href: "/settings", icon: "⚙", label: "Sozlama" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav style={{
      display: "flex",
      position: "fixed", bottom: 0, left: 0, right: 0,
      height: 60,
      background: "var(--color-background-primary)",
      borderTop: "0.5px solid var(--color-border-tertiary)",
      zIndex: 20,
    }}>
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} style={{
            flex: 1, textDecoration: "none",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 3,
            position: "relative",
          }}>
            <div style={{ position: "relative" }}>
              <span style={{
                fontSize: 20,
                filter: active ? "none" : "grayscale(1) opacity(0.5)",
              }}>{item.icon}</span>
              {item.badge && (
                <span style={{
                  position: "absolute", top: -4, right: -6,
                  background: "#ef4444", color: "#fff",
                  fontSize: 9, fontWeight: 500,
                  padding: "1px 4px", borderRadius: 999,
                }}>{item.badge}</span>
              )}
            </div>
            <span style={{
              fontSize: 10,
              color: active ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
              fontWeight: active ? 500 : 400,
            }}>{item.label}</span>
            {active && (
              <div style={{
                position: "absolute", top: 0, left: "50%",
                transform: "translateX(-50%)",
                width: 24, height: 2, borderRadius: 999,
                background: "var(--color-text-info)",
              }} />
            )}
          </Link>
        );
      })}
    </nav>
  );
}