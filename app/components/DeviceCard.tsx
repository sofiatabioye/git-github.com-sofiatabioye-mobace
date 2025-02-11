interface DeviceProps {
    id: string;
    name: string;
    status: "active" | "inactive";
    location: string;
    onClick: () => void;
  }
  
  export default function DeviceCard({ name, status, location, onClick }: DeviceProps) {
    return (
      <div
        className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700"
        onClick={onClick}
      >
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className={`text-sm ${status === "active" ? "text-green-400" : "text-red-400"}`}>
          {status}
        </p>
        <p className="text-gray-400 text-sm">{location}</p>
      </div>
    );
  }
  