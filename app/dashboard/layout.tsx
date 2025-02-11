"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Search,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Bell,
  Settings,
  HelpCircle,
  MonitorSmartphone,
  User,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get current path

  return (
    <div className="flex h-screen bg-[#333333] text-white">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-[#222222] border-r border-[#777777] p-6 flex flex-col justify-between transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        <div>
          <div className="text-lg font-bold mb-6 p-2 bg-[#333333] rounded-2xl text-white text-center">
            Mobace
          </div>
          <div className="bg-[#333333] p-3 rounded-xl cursor-pointer">
            <span className="text-gray-400 text-xs block">Your device</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-semibold">1230-2382-1211-9912</span>
              <ChevronDown size={16} />
            </div>
          </div>
          <nav className="space-y-4 mt-4 text-xs">
            <button
              onClick={() => router.push("/dashboard")}
              className={`w-full text-left px-4 py-2 rounded-xl flex items-center gap-2 ${
                pathname === "/dashboard" ? "bg-[#303030]" : "hover:bg-[#303030]"
              }`}
            >
              <LayoutDashboard size={16} /> Dashboard
            </button>
            <button
              onClick={() => router.push("/dashboard/my-devices")}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                pathname === "/dashboard/my-devices" ? "bg-[#303030]" : "hover:bg-[#303030]"
              }`}
            >
              <MonitorSmartphone size={16} /> My Devices
            </button>
            <button
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                pathname === "/dashboard/notifications" ? "bg-[#303030]" : "hover:bg-[#303030]"
              }`}
            >
              <Bell size={16} /> Notifications
            </button>
            <button
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                pathname === "/dashboard/settings" ? "bg-[#303030]" : "hover:bg-[#303030]"
              }`}
            >
              <Settings size={16} /> Settings
            </button>
          </nav>
          <div className="text-xs py-8">
            <button
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                pathname === "/dashboard/help" ? "bg-[#303030]" : "hover:bg-[#303030]"
              }`}
            >
              <HelpCircle size={16} /> Help & Support
            </button>
            <button
              onClick={() => router.push("/auth/login")}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#303030] flex items-center gap-2 text-red-500"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
        <div className="space-y-2 text-xs">
          <div className="bg-[#292929] p-4 rounded-lg flex flex-col items-center text-center mt-6">
            <User size={32} className="mb-2" />
            <span className="font-bold">John Doe</span>
            <span className="text-gray-400 text-sm">Admin</span>
            <button className="w-full bg-[#303030] text-white mt-3 py-2 rounded-lg font-bold text-sm">
              Manage profile
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#333333] overflow-auto">
        {/* Top Navbar */}
        <header className="bg-[#222222] px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
        {/* Navigation Buttons */}
        <button
          onClick={() => router.back()}
          className="bg-[#303030] p-2 rounded-lg flex items-center justify-center"
        >
          <ChevronLeft size={18} className="text-white" />
        </button>
        <button
          onClick={() => router.forward()}
          className="bg-[#303030] p-2 rounded-lg flex items-center justify-center"
        >
          <ChevronRight size={18} className="text-white" />
        </button>

        {/* Welcome Message */}
        <h1 className="text-xl font-bold text-white">Hello, John</h1>
      </div>
          <div className="relative w-72 hidden md:block">
            <input
              type="text"
              placeholder="Search your dashboard"
              className="w-full bg-[#303030] text-white px-4 py-2 rounded-full pl-10"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="gap-6 mt-4">{children}</main>
      </div>
    </div>
  );
}
