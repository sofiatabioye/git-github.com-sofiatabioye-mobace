import { Sun, Info, CloudRain, Wind, MapPin } from "lucide-react";
import { useDashboard } from "../dashboard/DashboardContext";


export default function InfoWidgets ({ sun, wind, rain}: { sun: number, wind: number, rain: string})  {
  const { selectedDevice } = useDashboard();
    return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#222222] p-4 rounded-lg flex flex-col text-white">
            <Sun size={24} className="text-white mb-2" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-white">{sun} W/m²</span>
              <Info size={16} className="text-white" />
            </div>
          </div>
          <div className="bg-[#222222] p-4 rounded-lg flex flex-col text-white">
            <CloudRain size={24} className="text-white mb-2" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-white">{rain} Rain</span>
              <Info size={16} className="text-white" />
            </div>
          </div>
          <div className="bg-[#222222] p-4 rounded-lg flex flex-col text-white">
            <Wind size={24} className="text-white mb-2" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-white">{wind} m/s</span>
              <Info size={16} className="text-white" />
            </div>
          </div>
          <div className="bg-[#222222] p-4 rounded-lg flex flex-col text-white">
            <MapPin size={24} className="text-white mb-2" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-white">{selectedDevice?.location|| ''}</span>
            </div>
          </div>
      </div>
    )
}