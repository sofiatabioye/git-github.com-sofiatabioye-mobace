export default function BatteryVoltage({inputVoltage, outputVoltage}: {inputVoltage: number, outputVoltage: number}) {
    return (
      <div className="bg-[#222222] p-4 rounded-lg text-white w-full">
        <h3 className="text-md font-bold pb-4">Battery Voltage</h3>
        <p className="text-gray-400 text-sm">Approx. Input Voltage</p>
        <p className="text-lg font-bold">{inputVoltage} V</p>
        <p className="text-gray-400 text-sm mt-2">Approx. Output Voltage</p>
        <p className="text-lg font-bold">{outputVoltage} V</p>
      </div>
    );
  }
  