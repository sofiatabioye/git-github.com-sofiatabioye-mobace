"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { ChevronDown } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

interface SolarChargeRateProps {
  solarChargeData: number[];
}

export default function SolarChargeRate({ solarChargeData }: SolarChargeRateProps) {
  const [timeRange, setTimeRange] = useState("7 days");

  const data = {
    labels: [
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
    ],
    datasets: [
      {
        label: "Charge Rate (W)",
        data: solarChargeData,
        borderColor: "#ffffff",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // let the chart fill its container's height
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: true, grid: { display: false } },
      y: { display: false },
    },
  };

  return (
    <div className="bg-[#222222] p-4 rounded-lg text-white w-full h-72">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-bold">Solar Charge Rate</h3>
        <button className="flex items-center gap-1 bg-[#333] px-3 py-1 rounded-lg text-sm">
          {timeRange} <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <div className="mt-4 w-full h-[80%]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
