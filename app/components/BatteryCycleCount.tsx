
import { Circle } from "rc-progress"; // Circular progress bar

export default function BatteryCycleCount() {
  const maxCycles = 2500;
  const currentCycles = 88;
  const batteryHealth = 96; // Percentage
  const progress = (currentCycles / maxCycles) * 100;

  return (
    <div className="bg-[#222222] p-4 rounded-lg text-white w-full flex flex-col">
      <h3 className="text-md font-bold">Battery Cycle Count</h3>
      <p className="text-gray-400 text-sm">Est. maximum cycles: <span className="font-bold">~ {maxCycles}</span></p>

      {/* Circular Progress Bar */}
      <div className="flex justify-center items-center my-4">
        <Circle
          percent={progress}
          strokeWidth={8}
          trailWidth={8}
          strokeColor="#22C55E"
          trailColor="#444"
          className="w-20 h-20"
        />
      </div>

      <p className="text-gray-400 text-sm">Battery Cycle Count</p>
      <p className="text-lg font-bold">{currentCycles}/{maxCycles}</p>

      <p className="text-gray-400 text-sm mt-2">Battery Health</p>
      <p className="text-lg font-bold">{batteryHealth}%</p>
    </div>
  );
}
