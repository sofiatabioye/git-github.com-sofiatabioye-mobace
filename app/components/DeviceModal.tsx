"use client";

import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Pencil, Copy, X, Trash2 } from "lucide-react";
import Image from "next/image";
import { Device } from "../dashboard/DashboardContext";
import { useDashboard } from "../dashboard/DashboardContext";
import { useSession } from "next-auth/react";

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  // For edit mode, pass an existing device.
  // For add mode, this prop can be omitted.
  device?: Device;
  // Only used in edit mode.
  onRemoveClick?: () => void;
  isNew?: boolean;
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

export default function DeviceModal({
  isOpen,
  onClose,
  device,
  onRemoveClick,
  isNew = false,
}: DeviceModalProps) {
  const { editDevice, createDevice } = useDashboard();
  const [isEditing, setIsEditing] = useState(isNew); // In add mode, always editing.
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  // Initial state: if in new mode, start with blank fields; otherwise, use the provided device.
  const initialDevice: Device = isNew
    ? {
        id: "",
        userId:  "",
        name: "",
        activationDate: "",
        location: "",
        status: "active",
        lastActiveDate: "",
        lastRuntime: "",
        batteryPercentage: 0,
        createdAt: new Date().toISOString(),
      }
    : (device as Device);

  const [editedDevice, setEditedDevice] = useState<Device>(initialDevice);

  // Reset form when modal re-opens or mode changes.
  useEffect(() => {
    setEditedDevice(initialDevice);
    setIsEditing(isNew);
  }, [isNew, device, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDevice({ ...editedDevice, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return; 
    try {
      if (isNew) {
        // Create a new device using the POST endpoint.
        const response = await createDevice({...editedDevice, userId: session.user.id});
        setMessage(response.message || "Device created successfully!");
      } else {
        // Edit an existing device.
        await editDevice(editedDevice);
        setMessage("Device updated successfully!");
      }
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  const copyDeviceId = () => {
    // For edit mode only – new device doesn't have an id yet.
    if (!isNew) {
      navigator.clipboard.writeText(device?.id || "");
    }
  };

  // Auto-clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Auto-clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* Trick to center modal content */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#222] shadow-xl rounded-lg">
              {error && <p className="py-4 text-red-600 text-center">{error}</p>}
              {message && <p className="py-4 text-green-600 text-center">{message}</p>}

              {/* Header */}
              <div className="flex justify-between items-center">
                <Dialog.Title as="h2" className="text-xl font-bold text-white">
                  {isNew ? "Add New Device" : "Device Details"}
                </Dialog.Title>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              {isNew ? (
                // ADD NEW DEVICE FORM
                <>
                  <div className="flex items-center gap-4 mt-4">
                    <Image src="/device.png" alt="Device" width={120} height={120} />
                    <div>
                      <p className="text-gray-400 text-sm">Device Name</p>
                      <input
                        type="text"
                        name="name"
                        value={editedDevice.name}
                        onChange={handleChange}
                        className="bg-[#303030] text-white px-2 py-1 rounded-md w-full"
                        placeholder="Enter device name"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-400 text-sm">Activation Number</p>
                    <input
                      type="text"
                      name="id"
                      value={editedDevice.id}
                      onChange={handleChange}
                      className="bg-[#303030] text-white px-2 py-1 rounded-md w-full"
                      placeholder="Enter activation number"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-400 text-sm">Location</p>
                    <input
                      type="text"
                      name="location"
                      value={editedDevice.location}
                      onChange={handleChange}
                      className="bg-[#303030] text-white px-2 py-1 rounded-md w-full"
                      placeholder="Enter location"
                    />
                  </div>
                </>
              ) : (
                // EDIT EXISTING DEVICE FORM
                <>
                  <div className="flex items-center gap-4 mt-4">
                    <Image src="/device.png" alt="Device" width={120} height={120} />
                    <div>
                      {/* Device Name */}
                      <p className="text-[#8E8E8E] text-xs font-bold">Device Name</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editedDevice.name}
                          onChange={handleChange}
                          className="bg-[#303030] text-white px-2 py-1 rounded-md w-full"
                        />
                      ) : (

                        <div className="flex items-center  gap-3">
                          <span className="text-md font-bold text-white">{device?.name}</span>
                          <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center bg-[#393939] px-2 py-1 font-bold rounded-md text-xs text-white"
                          >
                            <Pencil size={14} className="mr-1" /> Edit
                          </button>
                        </div>
                      )}

                      {/* Device ID */}
                      <p className="mt-2 text-[#8E8E8E] text-xs font-bold">
                        Device ID
                      </p>
                      <div className="flex gap-3">
                      <span className="text-md font-bold text-white">{device?.id}</span>
                      <button onClick={copyDeviceId} className=" bg-[#393939] px-2 py-1 rounded-md text-white hover:text-white">
                          <Copy size={16} />
                      </button>
                      </div>

                      {/* Edit button (only if not editing) */}
                      {/* {!isEditing && (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="mt-2 flex items-center bg-gray-600 px-2 py-1 rounded-md text-xs text-white"
                        >
                          <Pencil size={14} className="mr-1" /> Edit
                        </button>
                      )} */}
                    </div>
                  </div>

                  {/* Additional device details */}
                  <div className="grid grid-cols-3 gap-4 mt-4 text-white">
                    <div>
                      <p className="text-[#8E8E8E] text-xs font-bold">Activation Date</p>
                      <p className="font-bold">{formatDate(device?.activationDate || "")}</p>
                    </div>
                    <div>
                      <p className="text-[#8E8E8E] text-xs font-bold">Location</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="location"
                          value={editedDevice.location}
                          onChange={handleChange}
                          className="bg-[#303030] text-white px-2 py-1 rounded-md w-full"
                        />
                      ) : (
                        <p className="font-bold">{device?.location}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-[#8E8E8E] text-xs font-bold">Device Status</p>
                      <span className={`bg-[#303030] ${device?.status === 'active'? 'text-[#1FC16B]': 'text-red-600'} w-fit capitalize py-1 px-4 mt-1 text-xs font-bold rounded-3xl flex items-center gap-2`}>
                      ● {device?.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-[#8E8E8E] text-xs font-bold">Last Active Date</p>
                      <p className="font-bold">{formatDate(device?.lastActiveDate || "")}</p>
                    </div>
                    <div>
                      <p className="text-[#8E8E8E] text-xs font-bold">Last Runtime</p>
                      <p className="font-bold text-md">{formatDate(device?.lastRuntime || "")}</p>
                    </div>
                    <div>
                      <p className="text-[#8E8E8E] text-xs font-bold">Battery Percentage</p>
                      <p className="font-bold text-md">{device?.batteryPercentage}%</p>
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              {isNew || isEditing && <div className="flex w-full items-center mt-6">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-black w-full flex justify-center items-center font-bold py-2 px-4 rounded-lg"
                >
                  {isNew ? "Save Device" : isEditing ? "Save Changes" : ""}
                </button>
              </div>}
              {/* In edit mode (and not in editing state), show Remove button */}
              {!isNew && !isEditing && (
                <div className="flex w-full items-center mt-6">
                  <button
                    onClick={onRemoveClick}
                    className="bg-[#333] text-red-600 font-bold py-2 px-4 w-full rounded-lg flex justify-center items-center gap-2"
                  >
                    <Trash2 size={16} /> Remove Device
                  </button>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
