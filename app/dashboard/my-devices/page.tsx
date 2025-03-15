"use client";
import DeviceList from "./DeviceList";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { useDashboard, Device } from "../DashboardContext";
import { useState, useEffect } from "react";

export default function MyDevices() {

  const [activeDecices, setActiveDevices] = useState<Device[]>([])
  const [registeredDevices, setRegisteredDevices] = useState<Device[]>([])
  const { devices, loading } = useDashboard();
    
  useEffect(() => {
    if(!loading && devices){
      const activeDevices = devices.filter(device => device.status === 'active')
      setActiveDevices(activeDevices)
      setRegisteredDevices(devices)
    }
  }, [loading, devices])

  return (
    <div className="flex flex-col bg-[#333333] px-6 overflow-auto w-full">
      {/* Top Navbar */}
      <Breadcrumbs />
      {/* Active devices */}
      <DeviceList title={"Active Device(s)"} devices={activeDecices} />
      
      {/* Registed devices */}
      <DeviceList title={"Registered Device(s)"} devices={registeredDevices} />
    </div>
  );
}
