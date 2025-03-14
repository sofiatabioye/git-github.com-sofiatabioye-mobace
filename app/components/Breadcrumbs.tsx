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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Step 1: Click "Remove device" inside the device modal
  const handleRemoveClick = () => {
    setIsDeviceModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  // Step 2a: Cancel removal in confirmation modal
  const handleCancelRemoval = () => {
    setIsConfirmModalOpen(false);
    setIsDeviceModalOpen(true);
  };

  // Step 2b: Confirm removal
  const handleConfirmRemoval = async (deviceId: string) => {
    // TODO: call your API to remove the device
    // e.g. await fetch(`/api/devices/${deviceId}`, { method: "DELETE" });

    // Then show the success modal
    setIsConfirmModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  // Step 3: Close success modal
  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false);
    // e.g., refresh your device list or do other cleanup
  };

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
        device={dummyDevice}
        onRemoveClick={handleRemoveClick}
      />

      {/* Confirm Removal Modal (image 1) */}
      <ConfirmRemovalModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelRemoval} // If user cancels, go back
        onConfirm={() => handleConfirmRemoval(dummyDevice.id)}
      />

      {/* Removal Success Modal (image 2) */}
      <RemovalSuccessModal
        isOpen={isSuccessModalOpen}
        deviceName={dummyDevice.name}
        onClose={handleCloseSuccess}
      />
    </header>
  );
}
