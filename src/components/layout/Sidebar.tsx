// components/layout/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// ── Types ────────────────────────────────────────────────
type SubItem = { label: string; href: string; icon?: React.ReactNode };
type NavItem = {
  icon: React.ReactNode;
  href: string;
  label: string;
  children?: SubItem[];
};

// ── Icons ────────────────────────────────────────────────
const Icon = {
  dashboard: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  users: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87" />
    </svg>
  ),
  analytics: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  folder: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
      <path d="M2 7a2 2 0 0 1 2-2h4l2 3h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z" />
    </svg>
  ),
  finance: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v1m0 8v1M9.5 9.5C9.5 8.4 10.6 7.5 12 7.5s2.5.9 2.5 2c0 2.5-5 2.5-5 5 0 1.1 1.1 2 2.5 2s2.5-.9 2.5-2" />
    </svg>
  ),
  settings: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  chevronDown: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  sun: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  moon: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  ),
};

// ── Nav data ─────────────────────────────────────────────
const navItems: NavItem[] = [
  { icon: Icon.dashboard, href: "/dashboard", label: "Executive Overview" },
  {
    icon: Icon.users,
    href: "/legal",
    label: "Legal Operations",
    children: [
      { label: "Contracts", href: "/legal/contracts" },
      { label: "Compliance", href: "/legal/compliance" },
    ],
  },
  {
    icon: Icon.analytics,
    href: "/marketing",
    label: "Marketing",
    children: [
      { label: "Campaigns", href: "/marketing/campaigns" },
      { label: "SEO", href: "/marketing/seo" },
    ],
  },
  {
    icon: Icon.folder,
    href: "/productivity",
    label: "Productivity",
    children: [
      { label: "Tasks", href: "/productivity/tasks" },
      { label: "Calendar", href: "/productivity/calendar" },
    ],
  },
  {
    icon: Icon.analytics,
    href: "/social",
    label: "Social Media",
    children: [
      {
        label: "Instagram",
        href: "/social/instagram",
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
          </svg>
        ),
      },
      {
        label: "Twitter",
        href: "/social/twitter",
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        ),
      },
      {
        label: "Facebook",
        href: "/social/facebook",
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        ),
      },
      {
        label: "LinkedIn",
        href: "/social/linkedin",
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        ),
      },
      {
        label: "Youtube",
        href: "/social/youtube",
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
          </svg>
        ),
      },
      {
        label: "Tiktok",
        href: "/social/tiktok",
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.16 8.16 0 0 0 4.77 1.52V7.12a4.85 4.85 0 0 1-1-.43z" />
          </svg>
        ),
      },
    ],
  },
  { icon: Icon.finance, href: "/finance", label: "Finance" },
  { icon: Icon.settings, href: "/more", label: "More" },
];

// ── Component ─────────────────────────────────────────────
export default function Sidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>("Social Media");
  const [dark, setDark] = useState(false);

  const toggleMenu = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  return (
    <div className={dark ? "dark" : ""}>
      {/* Icon rail */}
      <div
        className={`
          fixed left-0 top-0 h-screen w-16 flex flex-col items-center py-4 gap-1 z-20
          border-r transition-colors duration-200
          bg-[#f7f6f3] border-zinc-200
          dark:bg-zinc-900 dark:border-zinc-800
        `}
      >
        {/* Logo */}
        <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center mb-4 shrink-0">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>

        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            item.children?.some((c) => pathname === c.href);
          return (
            <button
              key={item.label}
              onClick={() => toggleMenu(item.label)}
              title={item.label}
              className={`
                w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-150
                ${isActive
                  ? "bg-white shadow-sm text-zinc-900 dark:bg-zinc-700 dark:text-white"
                  : "text-zinc-400 hover:text-zinc-700 hover:bg-white/70 dark:hover:bg-zinc-700/60 dark:hover:text-zinc-200"
                }
              `}
            >
              {item.icon}
            </button>
          );
        })}

        {/* Dark mode toggle */}
        <div className="mt-auto">
          <button
            onClick={() => setDark(!dark)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-white/70 dark:hover:bg-zinc-700/60 dark:hover:text-zinc-200 transition-colors"
            title={dark ? "Light mode" : "Dark mode"}
          >
            {dark ? Icon.sun : Icon.moon}
          </button>
        </div>
      </div>

      {/* Nav panel */}
      <aside
        className={`
          fixed left-16 top-0 h-screen w-56 flex flex-col z-10
          border-r transition-colors duration-200
          bg-[#f7f6f3] border-zinc-200
          dark:bg-zinc-900 dark:border-zinc-800
        `}
      >
        {/* Header */}
        <div className="h-14 flex items-center px-4 border-b border-zinc-200 dark:border-zinc-800">
          <span className="text-base font-semibold text-zinc-900 dark:text-white tracking-tight">
            Dashboard
          </span>
          <button className="ml-auto p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {navItems.map((item) => {
            const isOpen = openMenu === item.label;
            const isActive = pathname === item.href;

            return (
              <div key={item.label}>
                {item.children ? (
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-150
                      ${isOpen
                        ? "text-zinc-900 font-medium dark:text-white"
                        : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/60"
                      }
                    `}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    >
                      {Icon.chevronDown}
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-3 py-2 rounded-lg text-sm transition-colors duration-150
                      ${isActive
                        ? "bg-white shadow-sm text-zinc-900 font-medium dark:bg-zinc-700 dark:text-white"
                        : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/60"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Sub items */}
                {item.children && isOpen && (
                  <div className="mt-0.5 mb-1 ml-2 pl-3 border-l border-zinc-200 dark:border-zinc-700 space-y-0.5">
                    {item.children.map((child) => {
                      const childActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`
                            flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors duration-150
                            ${childActive
                              ? "bg-white shadow-sm text-zinc-900 font-medium dark:bg-zinc-700 dark:text-white"
                              : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/60"
                            }
                          `}
                        >
                          {child.icon && (
                            <span className={childActive ? "text-zinc-700 dark:text-zinc-200" : "text-zinc-400"}>
                              {child.icon}
                            </span>
                          )}
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 px-3 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
              K
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-medium text-zinc-800 dark:text-zinc-100 truncate">
                Kamronbek
              </p>
              <p className="text-xs text-zinc-400 truncate">Admin</p>
            </div>
            <button className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="5" r="1" fill="currentColor" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
                <circle cx="12" cy="19" r="1" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}