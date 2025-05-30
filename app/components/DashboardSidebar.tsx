"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  LayoutDashboard,
  Bell,
  Settings,
  HelpCircle,
  MonitorSmartphone,
  User
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import DeviceDropdown from "./DeviceDropdown";

export default function DashboardSidebar() {

  const router = useRouter();
  const pathname = usePathname(); 
   const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false }); // Ensure logout happens without auto-redirect
      router.push("/auth/login"); // Redirect user to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  
  return (
    <aside
        className={`w-64 bg-[#222222] border-r border-[#777777] p-6 flex flex-col justify-between transition-transform -translate-x-64 md:translate-x-0`}
      >
        <div>
          <div className="text-lg font-bold mb-6 p-2 bg-[#333333] rounded-2xl text-white text-center">
            Robovolts
          </div>
          <DeviceDropdown />
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
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#303030] flex items-center gap-2 text-red-500"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
        <div className="space-y-2 text-xs">
          <div className="bg-[#292929] p-4 rounded-lg flex flex-col items-center text-center mt-6">
            
            <User size={32}  className="mb-2" />
            <span className="font-bold">{session?.user.name}</span>
            {/* <span className="text-gray-400 text-sm">Admin</span> */}
            <button className="w-full bg-[#303030] text-white mt-3 py-2 rounded-lg font-bold text-sm">
              Manage profile
            </button>
          </div>
        </div>
      </aside>
  );
}
