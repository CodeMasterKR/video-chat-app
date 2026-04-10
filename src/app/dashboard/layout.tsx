import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <main style={{ flex: 1, padding: 24 }}>
          {children}
        </main>
      </div>

      {/* Mobile navbar */}
      <div className="block md:hidden">
        <Navbar />
      </div>
    </div>
  );
}