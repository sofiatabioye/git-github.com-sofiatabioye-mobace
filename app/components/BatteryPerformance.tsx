import Image from "next/image";
export default function BatteryPerformance({batteryPerformance}: {batteryPerformance: string}) {
  return (
    <div className="bg-[#222222] p-4 rounded-lg text-white w-full flex flex-col">
      <h3 className="text-md font-bold pb-4">Battery Performance</h3>
      <div className="flex items-center gap-6 my-2">
        <Image src="/emoji-happy.png" alt="happy"  width={50} height={40}/>
        <p className="text-lg font-bold">{batteryPerformance}</p>
      </div>
      <p className="text-gray-400 text-sm">Your battery is performing in optimal conditions.</p>
    </div>
  );
}
