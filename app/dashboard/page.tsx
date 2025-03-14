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

export default  function Dashboard() {
  
  return (
    <div className="flex flex-col bg-[#333333] px-6 overflow-auto w-full gap-4">
      {/* Top Navbar */}
      <Breadcrumbs />

      {/* Dashboard Widgets */}
      <InfoWidgets />
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ConnectedPorts />
        <UsageStatistics />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BatteryVoltage />
        <BatteryPerformance />
        <BatteryCycleCount />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BatteryDissipation />
        <SolarChargeRate />
      </div>

    </div>
  );
}
