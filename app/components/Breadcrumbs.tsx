"use client";

import { useState } from "react";
import DeviceModal from "./DeviceModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";
import RemovalSuccessModal from "./RemovalSuccessModal";
import { Plus } from "lucide-react";

// Dummy device data
const dummyDevice = {
  id: "1",
  name: "Device name",
  deviceId: "1230 - 2382 - 1211 - 9912",
  activationDate: "11/12/2025",
  lastActiveDate: "11/12/2025",
  lastRuntime: "15h 32m 23s",
  location: "Lagos, Nigeria",
  status: "Active",
  battery: "89",
  admins: [
    { name: "Sofiat Abioye", avatar: "/avatar1.png" },
    { name: "Abdul Quayyum", avatar: "/avatar2.png" },
  ],
};

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
