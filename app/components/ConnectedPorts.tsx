import Image from "next/image";

const portsData = [
  { id: 1, status: "active", color: "green-400" },  // 100% - 70%
  { id: 2, status: "inactive", color: "gray-500" }, // Inactive
  { id: 3, status: "active", color: "green-400" },  // 100% - 70%
  { id: 4, status: "warning", color: "yellow-400" }, // 69% - 35%
  { id: 5, status: "inactive", color: "gray-500" }, // Inactive
  { id: 6, status: "active", color: "green-400" },  // 100% - 70%
  { id: 7, status: "danger", color: "red-400" },    // 34% - 0%
  { id: 8, status: "active", color: "green-400" },  // 100% - 70%
];

export default function ConnectedPorts() {
  return (
    <div className="bg-[#ffffff0d] p-6 rounded-lg text-white w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-bold">Connected Port(s)</h3>
        <p className="text-lg font-bold">6/8</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {portsData.map((port) => (
          <div key={port.id} className="flex justify-center">
            <Image
              src="/port.svg" 
              alt="Port"
              width={50}
              height={50}
              className={`filter brightness-0 invert hue-rotate-180 text-${port.color}`}
            />
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-gray-400 text-sm">Status Legend:</p>
        <div className="flex gap-4 text-xs mt-2">
          <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-400 rounded-full"></span> 100% - 70%</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 bg-yellow-400 rounded-full"></span> 69% - 35%</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-400 rounded-full"></span> 34% - 0%</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 bg-gray-500 rounded-full"></span> Inactive</div>
        </div>
      </div>
    </div>
  );
}
