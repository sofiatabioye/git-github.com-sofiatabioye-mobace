import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Device } from "../DashboardContext";
import DeviceDetails from "@/app/components/DeviceDetails";

export default function DeviceList({devices, title}: {devices: Device[], title: string}) {
  const [isExpanded, setIsExpanded] = useState(true);
  

  return (
    <div className="p-6 rounded-lg text-white">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-2">
        <div className="flex gap-8">
        <h2 className="text-lg font-bold">{title}</h2>
        <span className="text-lg font-semibold text-[#8F8F8F]">{devices?.length}</span>
        </div>
        <button
          className="p-2 bg-[#393939] rounded-md"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>
      
      {/* Device List (Collapsible) */}
      {isExpanded && (
        <div className="space-y-4 mt-4">
          {devices?.map((device) => (
            <DeviceDetails key={device.id} device={device} index={Number(device.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
