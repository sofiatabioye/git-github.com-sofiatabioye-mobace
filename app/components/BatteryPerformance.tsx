import { Smile } from "lucide-react"; // Lucide icon for performance

export default function BatteryPerformance() {
  return (
    <div className="bg-[#222222] p-4 rounded-lg text-white w-full flex flex-col">
      <h3 className="text-md font-bold">Battery Performance</h3>
      <div className="flex items-center gap-2 mt-2">
        <Smile className="w-6 h-6 text-green-400" />
        <p className="text-lg font-bold">Very Good!</p>
      </div>
      <p className="text-gray-400 text-sm">Your battery is performing in optimal conditions.</p>
    </div>
  );
}
