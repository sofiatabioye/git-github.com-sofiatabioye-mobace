"use client";

import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
} from "chart.js";
import { ChevronDown } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function UsageStatistics({usageStats}: {usageStats: any} ) {
  const [timeRange, setTimeRange] = useState("7 days");

  const data = {
    labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
    datasets: [
      {
        label: "Power Outage (kWh)",
        data: usageStats,
        backgroundColor: "#ffffff", // semi-transparent white
        // Round only the top corners:
        borderRadius: { topLeft: 20, topRight: 20 },
        borderSkipped: false,
        // Adjust bar thickness & spacing:
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // let the chart fill its container
    plugins: {
      legend: { display: false },
      tooltip: {
        displayColors: false,   // Hide color box
        titleColor: "#fff",
        bodyColor: "#fff",
        backgroundColor: "rgba(0,0,0,0.7)",
      },
    },
    scales: {
      x: {
        display: true,
        grid: { display: false },
        ticks: { color: "#fff" },
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-[#222222] p-6 rounded-lg text-white w-full h-72">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-bold">Usage Statistics</h3>
        <button className="flex items-center gap-1 bg-[#333] px-3 py-1 rounded-lg text-sm">
          {timeRange} <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <p className="text-gray-400 text-sm mt-1">
        An estimate of your generator’s power outage over a period, measured in <strong>kWh</strong>.
      </p>

      {/* Chart container with fixed height so the chart can expand */}
      <div className="mt-4 w-full h-48">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
