import { BatteryFull } from "lucide-react"; // Battery icon

export default function BatteryDissipation() {
  return (
    <div className="bg-[#222222] p-4 rounded-lg text-white w-full flex flex-col">
      <h3 className="text-md font-bold">Battery Dissipation Rate</h3>
      <div className="flex items-center gap-3 mt-2">
        <BatteryFull className="w-8 h-8 text-white" />
        <div>
          <p className="text-gray-400 text-sm">Battery percentage</p>
          <p className="text-lg font-bold">89%</p>
        </div>
      </div>
      <p className="text-gray-400 text-sm mt-2">Est. usage time remaining:</p>
      <p className="text-lg font-bold">2d 12h 45m</p>
    </div>
  );
}
