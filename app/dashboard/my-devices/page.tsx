"use client";
import { Plus, Sun, Info, CloudRain, Wind, MapPin } from "lucide-react";
import ActiveDevices from "./ActiveDevices";
import RegisteredDevices from "./RegisteredDevices";


export default function MyDevices() {
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

      {/* Active devices */}
      <ActiveDevices />
      
      {/* Registed devices */}
      <RegisteredDevices />
    </div>
  );
}
