"use client";

import { useState } from "react";
import DeviceModal from "./DeviceModal";
import { Plus } from "lucide-react";


export default function Breadcrumbs() {
  // Track which modals are open
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);

  return (
    <header className="py-4 flex justify-between items-center">
      <nav className="flex items-center gap-2 text-gray-400 text-sm">
        <span>Dashboard</span>
        <span className="bg-white text-black px-2 py-1 rounded-lg text-xs font-bold">
          My Devices
        </span>
      </nav>
      <button
        onClick={() => setIsDeviceModalOpen(true)}
        className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <Plus size={16} /> Add new device
      </button>

      {/* Device Details Modal */}
      <DeviceModal
        isOpen={isDeviceModalOpen}
        onClose={() => setIsDeviceModalOpen(false)}
        isNew={true}
      />

    </header>
  );
}
