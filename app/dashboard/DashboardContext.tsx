"use client";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Device {
  id: string;
  userId: string;
  name: string;
  location: string;
  status: string;
  createdAt: string;
  activationDate: string;
  lastActiveDate: string;
  lastRuntime: string;
  batteryPercentage: number;
}

interface DashboardContextValue {
  devices: Device[];
  loading: boolean;
  error: string | null;
  refreshDevices: () => Promise<void>;
  selectedDevice: Device | null;
  setSelectedDevice: (device: Device) => void;
  editDevice: (updatedDevice: Device) => Promise<{message: string, success?: boolean, device?: Device}>;
  deleteDevice: (deviceId: string) => Promise<{message?: string} | void>;
  createDevice: (newDevice: Partial<Device>) => Promise<{message?: string}>;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
 const { data: session } = useSession();

  const fetchDevices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/devices/list?userId=${session?.user.id}`); // Adjust this path if needed
      const data = await res.json();
      if (res.ok) {
        setDevices(data.devices);
      } else {
        setError(data.message || "Failed to fetch devices.");
      }
    } catch (err) {
      setError("An error occurred while fetching devices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  // Once devices are fetched, if no device is selected, choose the first one
  useEffect(() => {
    if (!selectedDevice && devices.length > 0) {
      setSelectedDevice(devices[0]);
    }
  }, [devices, selectedDevice]);

  const refreshDevices = async () => {
    await fetchDevices();
  };

  const editDevice = async (updatedDevice: Device) => {
    try {
      const res = await fetch("/api/devices/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDevice),
      });
      if (!res.ok) {
        throw new Error("Failed to update device");
      }
      const data = await res.json();
      // Assume the API returns the updated device as data.device
      setDevices((prev) =>
        prev.map((device) => (device.id === updatedDevice.id ? data.device : device))
      );
      if (selectedDevice && selectedDevice.id === updatedDevice.id) {
        setSelectedDevice(data.device);
      }
    } catch (err: any) {
      const errMessage = err.message || "An error occurred while updating device";
      setError(errMessage);
      return({message: errMessage})
    }
  };

  const deleteDevice = async (deviceId: string) => {
    try {
      const res = await fetch(`/api/devices/${deviceId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete device");
      }
      setDevices((prev) => prev.filter((device) => device.id !== deviceId));
      if (selectedDevice && selectedDevice.id === deviceId) {
        // Update selected device to the first remaining device or null
        const remainingDevices = devices.filter((device) => device.id !== deviceId);
        setSelectedDevice(remainingDevices[0] || null);
      }
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred while deleting device"
      setError(errorMessage);
      return errorMessage
    }
  };

  const createDevice = async (newDevice: Partial<Device>) => {
    const data = {
      userId: 'errr',

    }
    try {
      const res = await fetch("/api/devices/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDevice),
      });
      const data = await res.json();
     
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to create device");
      }
      // Assume the API returns the created device in data.device.
      setDevices((prev) => [...prev, data.device]);
      return data
    } catch (err: any) {
      console.log(err, 'err')
      const errMessage = err.message || "An error occurred while creating device"
      setError(errMessage);
      return { message: errMessage}
    }
  };

  return (
    <DashboardContext.Provider
      value={{ devices, loading, error, refreshDevices, selectedDevice, setSelectedDevice, editDevice, deleteDevice, createDevice }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
