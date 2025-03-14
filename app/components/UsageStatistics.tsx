import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
import { ChevronDown } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function UsageStatistics() {
  const [timeRange, setTimeRange] = useState("7 days");

  const data = {
    labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
    datasets: [
      {
        label: "Power Outage (kWh)",
        data: [200, 400, 300, 500, 567.2, 250, 450],
        backgroundColor: ["#ffffff80"],
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: true, grid: { display: false }, ticks: { color: "#fff" } },
      y: { display: false },
    },
  };

  return (
    <div className="bg-[#222222] p-6 rounded-lg text-white w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-bold">Usage Statistics</h3>
        <button className="flex items-center gap-1 bg-[#333] px-3 py-1 rounded-lg text-sm">
          {timeRange} <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <p className="text-gray-400 text-sm mt-1">An estimate of your generator’s power outage over a period, measured in <strong>kWh</strong>.</p>

      <div className="mt-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
