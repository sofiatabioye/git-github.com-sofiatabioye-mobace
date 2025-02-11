"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

interface Stats {
  battery: number;
  solarCharge: number;
  powerUsage: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);

  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/auth/login");
  // }

  useEffect(() => {
    // Mock API call for dashboard stats
    setTimeout(() => {
      setStats({
        battery: 78,
        solarCharge: 55,
        powerUsage: 120,
      });
    }, 1000);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Battery Level</h2>
            <p className="text-3xl">{stats ? `${stats.battery}%` : "Loading..."}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Solar Charge</h2>
            <p className="text-3xl">{stats ? `${stats.solarCharge}%` : "Loading..."}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Power Usage</h2>
            <p className="text-3xl">{stats ? `${stats.powerUsage}W` : "Loading..."}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
