import { ReactNode } from "react";
import DashboardHeader from "../components/Header";
import DashboardSidebar from "../components/DashboardSidebar";
import AuthProvider from "../providers/AuthProvider";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider requireAuth>
      <div className="flex h-screen bg-[#333333] text-white">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-[#333333] overflow-auto">
          {/* Top Navbar */}
          <DashboardHeader />

          {/* Main Content Area */}
          <main className="gap-6 mt-4">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
