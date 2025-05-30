
import { Circle } from "rc-progress"; // Circular progress bar

export default function BatteryCycleCount({maxCycles, currentCycles, batteryHealth}: {maxCycles: number, currentCycles: number, batteryHealth: number}) {

  const progress = (currentCycles / maxCycles) * 100;

  return (
    <div className="bg-[#222222] p-4 rounded-lg text-white w-full flex flex-col">
      <h3 className="text-md font-bold">Battery Cycle Count</h3>
      <p className="text-gray-400 text-sm">Est. maximum cycles: <span className="font-bold">~ {maxCycles}</span></p>

      {/* Circular Progress Bar */}
      <div className="flex  justify-between items-center my-4">
        <Circle
          percent={progress}
          strokeWidth={15}
          trailWidth={15}
          strokeColor="#fff"
          trailColor="#444"
          className="w-20 h-20"
        />
   
      <div>
        <p className="text-gray-400 text-sm">Battery Cycle Count</p>
        <p className="text-lg font-bold">{currentCycles}/{maxCycles}</p>

        <p className="text-gray-400 text-sm mt-2">Battery Health</p>
        <p className="text-lg font-bold">{batteryHealth}%</p>
      </div>
      </div>
    </div>
  );
}
