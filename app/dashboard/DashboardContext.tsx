"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Device {
  id: string;
  userId: string;
  name: string;
  location: string;
  status: string;
  createdAt: string;
}

interface DashboardContextValue {
  devices: Device[];
  loading: boolean;
  error: string | null;
  refreshDevices: () => Promise<void>;
  selectedDevice: Device | null;
  setSelectedDevice: (device: Device) => void;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const fetchDevices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/devices"); // Adjust this path if needed
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

  return (
    <DashboardContext.Provider
      value={{ devices, loading, error, refreshDevices, selectedDevice, setSelectedDevice }}
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
