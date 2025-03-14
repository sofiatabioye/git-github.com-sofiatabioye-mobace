import { useState, useEffect } from "react";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useDashboard, Device } from "../DashboardContext";

const registeredDevices = [
  {
    id: "1230-2382-1211-9912",
    name: "Device name",
    location: "Ibadan, NGA",
    status: "Inactive",
    image: "/device-image.png", // Replace with actual image path
  },
  {
    id: "1230-2382-1211-9912",
    name: "Device name",
    location: "Ibadan, NGA",
    status: "Active",
    image: "/device-image.png", // Replace with actual image path
  },
  {
    id: "1230-2382-1211-9912",
    name: "Device name",
    location: "Ibadan, NGA",
    status: "Active",
    image: "/device-image.png", // Replace with actual image path
  },
];

export default function RegisteredDevices() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [registeredDevices, setRegisteredDevices] = useState<Device[]>([])
  const { devices, loading } = useDashboard();

    
  useEffect(() => {
       if(!loading){
         setRegisteredDevices(devices)
       }
  }, [loading])


  return (
    <div className="p-6 rounded-lg text-white">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-2">
        <div className="flex gap-8">
          <h2 className="text-lg font-bold">Registered Device(s)</h2>
          <span className="text-lg font-semibold text-[#8F8F8F]">{registeredDevices.length}</span>
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
          {registeredDevices.map((device, index) => (
            <div key={index} className="flex items-center rounded-2xl bg-[#222222]">
              {/* Device Image */}
              <div className="rounded-2xl p-4 pl-6" style={{ background: "linear-gradient(304.87deg, rgba(34, 34, 34, 0.08) -1.17%, rgba(34, 34, 34, 0.1) 38.73%, rgba(121, 121, 121, 0.2) 54.24%, #CACACA 98.82%)" }}>
                <Image src="/device.png" alt="device" height={120} width={120} />
              </div>
              <div className="flex w-full justify-around">
                {/* Device Info */}
                <div className="ml-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white">{device.name}</h3>
                    <button className="bg-[#393939] p-2 rounded-lg">
                      <Pencil size={14} color="white" fill="white" stroke="black" />
                    </button>
                  </div>
                  <p className="text-[#8E8E8E] text-sm">{device.id}</p>
                </div>
                
                {/* Device Location */}
                <div className="text-right mr-6">
                  <p className="text-[#8E8E8E] text-xs">Current location</p>
                  <p className="font-bold text-white">{device.location}</p>
                </div>
                
                {/* Status */}
                <span className={`bg-[#333333] text-${device.status === "Active" ? "[#1FC16B]" : "[#FB3748"} py-1 px-4 text-xs font-bold rounded-full flex items-center gap-4`}>
                  <span className={`w-2 h-2 bg-${device.status === "Active" ? "[#1FC16B]" : "#FB3748"} rounded-full inline-block shrink-0`}></span> {device.status}
                </span>
                
                {/* View Details Button */}
                <button className="ml-4 bg-[#393939] px-4 py-2 rounded-xl text-white font-bold text-xs">
                  View full details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
