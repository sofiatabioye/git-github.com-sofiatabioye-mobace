import Image
 from "next/image";
export default function BatteryDissipation({batteryPercentage, batteryUsageTimeRemaining}: {batteryPercentage: number, batteryUsageTimeRemaining: string}) {
  return (
    <div className="bg-[#222222] p-4 rounded-lg text-white w-full flex flex-col">
      <h3 className="text-md font-bold">Battery Dissipation Rate</h3>
      <div className="flex items-center gap-3 mt-2">
        <Image src="/battery.png" height={100} width={100} alt="battery" />
        <div>
          <div>
            <p className="text-gray-400 text-sm">Battery percentage</p>
            <p className="text-lg font-bold">{batteryPercentage}%</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mt-2">Est. usage time remaining:</p>
            <p className="text-lg font-bold">{batteryUsageTimeRemaining}</p>
          </div>
        </div>
      </div>
     
    </div>
  );
}
