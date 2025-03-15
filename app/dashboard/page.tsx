"use client";
import BatteryCycleCount from "../components/BatteryCycleCount";
import BatteryPerformance from "../components/BatteryPerformance";
import BatteryVoltage from "../components/BatteryVoltage";
import BatteryDissipation from "../components/BatteryDissipation";
import SolarChargeRate from "../components/SolarChargeRate";
import ConnectedPorts from "../components/ConnectedPorts";
import UsageStatistics from "../components/UsageStatistics";
import InfoWidgets from "../components/InfoWidgets";
import Breadcrumbs from "../components/Breadcrumbs";
import { useDashboard } from "./DashboardContext";

export default  function Dashboard() {
   
  // const portsData = [
  //   { id: 1, status: "active", color: "green-400", imagesrc: "/greenport.svg" },
  //   { id: 2, status: "inactive", color: "gray-500", imagesrc: "/greyport.svg",}, 
  //   { id: 3, status: "active", color: "green-400",  imagesrc: "/greenport.svg" },
  //   { id: 4, status: "warning", color: "yellow-400",  imagesrc: "/yellowport.svg" },
  //   { id: 5, status: "inactive", color: "gray-500",  imagesrc: "/greyport.svg" },
  //   { id: 6, status: "active", color: "green-400",  imagesrc: "/greenport.svg" },
  //   { id: 7, status: "danger", color: "red-400",  imagesrc: "/redport.svg" }, 
  //   { id: 8, status: "active", color: "green-400",  imagesrc: "/greenport.svg" },
  // ];

  const statuses = [
    { status: "active", color: "green-400", imagesrc: "/greenport.svg" },
    { status: "inactive", color: "gray-500", imagesrc: "/greyport.svg" },
    { status: "warning", color: "yellow-400", imagesrc: "/yellowport.svg" },
    { status: "danger", color: "red-400", imagesrc: "/redport.svg" },
  ];
  const portsData = [];
  for (let i = 1; i <= 8; i++) {
    const randomIndex = Math.floor(Math.random() * statuses.length);
    portsData.push({ id: i, ...statuses[randomIndex] });
  }

  // const usageStats = [200, 400, 300, 500, 567.2, 250, 450];
  const usageStats = Array.from({ length: 7 }, () =>
    Math.floor(Math.random() * (600 - 200 + 1)) + 200
  );
  // const inputVoltage = 14.4;
  // const outputVoltage = 12.6;
   // Randomize input and output voltage (with one decimal)
   const inputVoltage = Number((Math.random() * (15 - 13.5) + 13.5).toFixed(1));
   const outputVoltage = Number((Math.random() * (13 - 11) + 11).toFixed(1));
  const batteryPerformance = 'Very Good!'

   // Randomize max cycles (between 2000 and 3000) and current cycles (between 50 and 150)
   const maxCycles = 2500
   const currentCycles = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
 
   // Randomize battery health and percentage (in percentages)
   const batteryHealth = Math.floor(Math.random() * (100 - 80 + 1)) + 80;
   const batteryPercentage = Math.floor(Math.random() * (100 - 70 + 1)) + 70;
 
   // Randomize battery usage time remaining (e.g. "2d 12h 45m")
   const batteryUsageTimeRemaining = `${Math.floor(Math.random() * 5) + 1}d ${Math.floor(
     Math.random() * 24
   )}h ${Math.floor(Math.random() * 60)}m`;
 
   // Randomize solar charge data: an array of 13 numbers between 10 and 120
   const solarChargeData = Array.from({ length: 13 }, () =>
     Math.floor(Math.random() * (120 - 10 + 1)) + 10
   );
  // const maxCycles = 2500;
  // const currentCycles = 88;
  // const batteryHealth = 96; //percentage
  // const batteryPercentage = 89; //percentage
  // const batteryUsageTimeRemaining = "2d 12h 45m";
  // const solarChargeData = [10, 20, 35, 50, 65, 80, 100, 90, 85, 70, 55, 40, 60]
  function getRandomWeatherData() {
    // Random sun value between 8 and 16
    const sun = Math.floor(Math.random() * (16 - 8 + 1)) + 8;
    
    // Random rain condition from the available options
    const rainOptions = ['Light', 'Moderate', 'Heavy'];
    const rain = rainOptions[Math.floor(Math.random() * rainOptions.length)];
    
    // Random wind speed between 10 and 50
    const wind = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    
    return { sun, rain, wind };
  }
  const weather = getRandomWeatherData();

  return (
    <div className="flex flex-col bg-[#333333] px-6 overflow-auto w-full gap-4">
      {/* Top Navbar */}
      <Breadcrumbs />

      {/* Dashboard Widgets */}
      <InfoWidgets sun={weather.sun} rain={weather.rain} wind={weather.wind} />
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ConnectedPorts  portsData={portsData}/>
        <UsageStatistics usageStats={usageStats} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BatteryVoltage inputVoltage={inputVoltage} outputVoltage={outputVoltage} />
        <BatteryPerformance batteryPerformance={batteryPerformance}  />
        <BatteryCycleCount maxCycles={maxCycles} currentCycles={currentCycles} batteryHealth={batteryHealth} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BatteryDissipation batteryPercentage={batteryPercentage} batteryUsageTimeRemaining={batteryUsageTimeRemaining} />
        <SolarChargeRate solarChargeData={solarChargeData}/>
      </div>

    </div>
  );
}
