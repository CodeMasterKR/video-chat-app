// app/(dashboard)/page.tsx

import Link from "next/link";

const recentCalls = [
  { id: 1, name: "Jasur Karimov", type: "incoming", duration: "12:34", time: "Bugun, 14:20", avatar: "JK" },
  { id: 2, name: "Malika Tosheva", type: "outgoing", duration: "05:10", time: "Bugun, 11:05", avatar: "MT" },
  { id: 3, name: "Bobur Aliev", type: "missed", duration: "-", time: "Kecha, 20:44", avatar: "BA" },
];

const recentMessages = [
  { id: 1, name: "Jasur Karimov", text: "Yaxshimisiz?", time: "14:22", unread: 2, avatar: "JK" },
  { id: 2, name: "Dilnoza Yusupova", text: "Hujjatni yubordim", time: "10:15", unread: 0, avatar: "DY" },
  { id: 3, name: "Bobur Aliev", text: "Qo'ng'iroq qilay?", time: "Kecha", unread: 1, avatar: "BA" },
];

const callTypeIcon: Record<string, string> = {
  incoming: "↙",
  outgoing: "↗",
  missed: "✕",
};

const callTypeColor: Record<string, string> = {
  incoming: "var(--color-text-success)",
  outgoing: "var(--color-text-info)",
  missed: "var(--color-text-danger)",
};

export default function DashboardPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>

      {/* Welcome */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 4px", color: "var(--color-text-primary)" }}>
          Xush kelibsiz 👋
        </h2>
        <p style={{ fontSize: 14, margin: 0, color: "var(--color-text-secondary)" }}>
          Bugun 3 ta o'tkazib yuborilgan qo'ng'iroq va 3 ta yangi xabar bor.
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 12,
        marginBottom: 28,
      }}>
        {[
          { label: "Kontaktlar", value: "24", icon: "👤" },
          { label: "Bugungi qo'ng'iroqlar", value: "7", icon: "☎" },
          { label: "Yangi xabarlar", value: "3", icon: "✉" },
          { label: "O'tkazib yuborilgan", value: "1", icon: "✕" },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: "var(--color-background-secondary)",
            borderRadius: 10, padding: "14px 16px",
          }}>
            <p style={{ fontSize: 20, margin: "0 0 6px" }}>{stat.icon}</p>
            <p style={{ fontSize: 22, fontWeight: 500, margin: "0 0 2px", color: "var(--color-text-primary)" }}>
              {stat.value}
            </p>
            <p style={{ fontSize: 12, margin: 0, color: "var(--color-text-secondary)" }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
        <Link href="/call/new" style={{ textDecoration: "none" }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 20px", borderRadius: 8, fontSize: 14,
            border: "0.5px solid var(--color-border-secondary)",
            background: "transparent", cursor: "pointer",
            color: "var(--color-text-primary)",
          }}>
            📹 Video qo'ng'iroq
          </button>
        </Link>
        <Link href="/chat" style={{ textDecoration: "none" }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 20px", borderRadius: 8, fontSize: 14,
            border: "0.5px solid var(--color-border-secondary)",
            background: "transparent", cursor: "pointer",
            color: "var(--color-text-primary)",
          }}>
            ✉ Xabar yuborish
          </button>
        </Link>
        <Link href="/contacts" style={{ textDecoration: "none" }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 20px", borderRadius: 8, fontSize: 14,
            border: "0.5px solid var(--color-border-secondary)",
            background: "transparent", cursor: "pointer",
            color: "var(--color-text-primary)",
          }}>
            👤 Kontakt qo'shish
          </button>
        </Link>
      </div>

      {/* Two columns: recent calls + recent messages */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

        {/* Recent calls */}
        <div style={{
          background: "var(--color-background-primary)",
          border: "0.5px solid var(--color-border-tertiary)",
          borderRadius: 12, padding: "16px 20px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <p style={{ fontSize: 14, fontWeight: 500, margin: 0, color: "var(--color-text-primary)" }}>
              So'nggi qo'ng'iroqlar
            </p>
            <Link href="/call" style={{ fontSize: 12, color: "var(--color-text-info)", textDecoration: "none" }}>
              Barchasi
            </Link>
          </div>

          {recentCalls.map((call) => (
            <div key={call.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 0",
              borderBottom: "0.5px solid var(--color-border-tertiary)",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "var(--color-background-info)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 500, color: "var(--color-text-info)",
                flexShrink: 0,
              }}>{call.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 2px", color: "var(--color-text-primary)" }}>
                  {call.name}
                </p>
                <p style={{ fontSize: 11, margin: 0, color: "var(--color-text-tertiary)" }}>{call.time}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 14, margin: "0 0 2px", color: callTypeColor[call.type] }}>
                  {callTypeIcon[call.type]}
                </p>
                <p style={{ fontSize: 11, margin: 0, color: "var(--color-text-tertiary)" }}>{call.duration}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent messages */}
        <div style={{
          background: "var(--color-background-primary)",
          border: "0.5px solid var(--color-border-tertiary)",
          borderRadius: 12, padding: "16px 20px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <p style={{ fontSize: 14, fontWeight: 500, margin: 0, color: "var(--color-text-primary)" }}>
              So'nggi xabarlar
            </p>
            <Link href="/chat" style={{ fontSize: 12, color: "var(--color-text-info)", textDecoration: "none" }}>
              Barchasi
            </Link>
          </div>

          {recentMessages.map((msg) => (
            <Link key={msg.id} href={`/chat/${msg.id}`} style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 0",
                borderBottom: "0.5px solid var(--color-border-tertiary)",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "var(--color-background-warning)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 500, color: "var(--color-text-warning)",
                  flexShrink: 0,
                }}>{msg.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 2px", color: "var(--color-text-primary)" }}>
                    {msg.name}
                  </p>
                  <p style={{
                    fontSize: 11, margin: 0, color: "var(--color-text-tertiary)",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>{msg.text}</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: 11, margin: "0 0 4px", color: "var(--color-text-tertiary)" }}>{msg.time}</p>
                  {msg.unread > 0 && (
                    <span style={{
                      background: "var(--color-background-danger)",
                      color: "var(--color-text-danger)",
                      fontSize: 10, fontWeight: 500,
                      padding: "1px 6px", borderRadius: 999,
                    }}>{msg.unread}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}