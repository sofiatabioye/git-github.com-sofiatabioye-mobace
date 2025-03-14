"use client";
import { Plus} from "lucide-react";
import ActiveDevices from "./ActiveDevices";
import RegisteredDevices from "./RegisteredDevices";
import Breadcrumbs from "@/app/components/Breadcrumbs";


export default function MyDevices() {
  return (
    <div className="flex flex-col bg-[#333333] px-6 overflow-auto w-full">
      {/* Top Navbar */}
      <Breadcrumbs />
      {/* Active devices */}
      <ActiveDevices />
      
      {/* Registed devices */}
      <RegisteredDevices />
    </div>
  );
}
