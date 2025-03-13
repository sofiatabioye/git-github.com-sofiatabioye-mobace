"use client";
import { Plus, Sun, Info, CloudRain, Wind, MapPin } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }
  return (
    <div className="flex flex-col bg-[#333333] px-6 overflow-auto w-full">
      {/* Top Navbar */}
      <header className="py-4 flex justify-between items-center">
          <nav className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Dashboard</span>
              <span className="bg-white text-black px-2 py-1 rounded-lg text-xs font-bold">My Devices</span>
          </nav>
          <button className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus size={16} /> Add new device
          </button>
      </header>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          <div className="bg-[#222222] p-4 rounded-lg flex flex-col text-white">
            <Sun size={24} className="text-white mb-2" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-white">650 W/m²</span>
              <Info size={16} className="text-white" />
            </div>
          </div>
          <div className="bg-[#222222] p-4 rounded-lg flex flex-col text-white">
            <CloudRain size={24} className="text-white mb-2" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-white">Moderate Rain</span>
              <Info size={16} className="text-white" />
            </div>
          </div>
          <div className="bg-[#222222] p-4 rounded-lg flex flex-col text-white">
            <Wind size={24} className="text-white mb-2" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-white">15m/s</span>
              <Info size={16} className="text-white" />
            </div>
          </div>
          <div className="bg-[#222222] p-4 rounded-lg flex flex-col text-white">
            <MapPin size={24} className="text-white mb-2" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-white">Ibadan, NGA</span>
            </div>
          </div>
      </div>

    </div>
  );
}
