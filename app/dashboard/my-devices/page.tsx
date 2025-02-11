"use client";

import { useState } from "react";
import DeviceModal from "./DeviceModal";
import Sidebar from "../../components/Sidebar";

interface Device {
  id: string;
  name: string;
  status: "active" | "inactive";
  location: string;
}

export default function MyDevices() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  // Mock devices data
  const devices: Device[] = [
    { id: "1", name: "Solar Panel 1", status: "active", location: "New York" },
    { id: "2", name: "Battery Backup", status: "inactive", location: "California" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold">My Devices</h1>
        <div className="grid grid-cols-2 gap-6 mt-6">
          {devices.map((device) => (
            <div
              key={device.id}
              className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700"
              onClick={() => setSelectedDevice(device)}
            >
              <h2 className="text-lg font-semibold">{device.name}</h2>
              <p className={`text-sm ${device.status === "active" ? "text-green-400" : "text-red-400"}`}>
                {device.status}
              </p>
              <p className="text-gray-400 text-sm">{device.location}</p>
            </div>
          ))}
        </div>

        {selectedDevice && <DeviceModal device={selectedDevice} onClose={() => setSelectedDevice(null)} />}
      </main>
    </div>
  );
}
