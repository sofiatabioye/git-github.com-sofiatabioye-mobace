import Image from "next/image";

/**
 * Represents an array of port objects, each containing details about the port's
 * ID, status, color, and associated image source.
 *
 * Each port object has the following properties:
 * - `id` (number): A unique identifier for the port.
 * - `status` (string): The current status of the port. Possible values include:
 *   - `"active"`: The port is active and operational.
 *   - `"inactive"`: The port is inactive or not in use.
 *   - `"warning"`: The port is in a warning state.
 *   - `"danger"`: The port is in a critical or danger state.
 * - `color` (string): A Tailwind CSS color class representing the port's status visually.
 * - `imagesrc` (string): The file path to the image representing the port's status.
 */



export default function ConnectedPorts({portsData}: {portsData: { id: number, status: string, color: string, imagesrc: string}[]}) {
  return (
    <div className="bg-white text-black p-6 rounded-lg w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md text-[#333333] font-bold">Connected Port(s)</h3>
        <p className="text-sm font-bold text-[#8E8E8E]">6/8</p>
      </div>
      <hr className="bg-gray" />
      <div className="flex justify-between gap-4">
        <div className="w-full grid grid-cols-4 gap-4 mt-4">
          {portsData.map((port) => (
            <div key={port.id} className="flex justify-center">
              <Image
                src={port.imagesrc} 
                alt="Port"
                width={60}
                height={60}
              />
            </div>
          ))}
        </div>
        <div className="min-w-fit mt-6">
   
          <div className="flex flex-col gap-4 text-xs mt-2">
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-400 rounded-full"></span> 100% - 70%</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-yellow-400 rounded-full"></span> 69% - 35%</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-400 rounded-full"></span> 34% - 0%</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-gray-500 rounded-full"></span> Inactive</div>
          </div>
        </div>
      </div>
    </div>
  );
}
