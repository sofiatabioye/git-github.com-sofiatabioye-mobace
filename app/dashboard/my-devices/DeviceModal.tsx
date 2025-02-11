"use client";

interface Device {
  id: string;
  name: string;
  status: "active" | "inactive";
  location: string;
}

export default function DeviceModal({ device, onClose }: { device: Device; onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold">{device.name}</h2>
        <p className="text-gray-400 text-sm">ID: {device.id}</p>
        <p className={`text-sm ${device.status === "active" ? "text-green-400" : "text-red-400"}`}>
          {device.status}
        </p>
        <p className="text-gray-400 text-sm">Location: {device.location}</p>

        <button
          onClick={onClose}
          className="w-full mt-4 bg-red-500 hover:bg-red-600 p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
