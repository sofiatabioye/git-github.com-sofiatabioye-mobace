"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // or import from your icon library
import { useDashboard } from "../dashboard/DashboardContext";

interface Device {
  id: string;
  userId: string;
  name: string;
  location: string;
  status: string;
  createdAt?: string;
}

export default function DeviceDropdown({  }: { }) {
  const [isOpen, setIsOpen] = useState(false);
  const { devices, loading } = useDashboard();
  const [selectedDevice, setSelectedDevice] = useState<Device| null>(null);
  
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (device: Device) => {
    setSelectedDevice(device);
    setIsOpen(false);
  };
  useEffect(() => {
    if(!loading){
      setSelectedDevice(devices[0])
    }
  }, [loading])

  return (
    <div className="relative">
      <div
        className="bg-[#333333] p-3 rounded-xl cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="text-gray-400 text-xs block">Your device</span>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs font-semibold">
            {selectedDevice ? selectedDevice.id : "Select a device"}
          </span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10">
          {devices.map((device) => (
            <div
              key={device.id}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(device)}
            >
              {device.id}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
