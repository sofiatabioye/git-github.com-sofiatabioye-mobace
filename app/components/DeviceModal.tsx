"use client";

import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Pencil, Clipboard, X, Trash2 } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";

interface Device {
  id: string;
  name: string;
  deviceId: string;
  activationDate: string;
  lastActiveDate: string;
  lastRuntime: string;
  location: string;
  status: "Active" | "Inactive" | string;
  battery: string;
  admins: { name: string; avatar: string }[];
}

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  device: Device;
  // Call this to trigger the remove flow
  onRemoveClick: () => void;
}

export default function DeviceModal({
  isOpen,
  onClose,
  device,
  onRemoveClick,
}: DeviceModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDevice, setEditedDevice] = useState(device);

  const handleEdit = () => setIsEditing(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDevice({ ...editedDevice, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // If you want to handle updates, do so here or via a prop callback
    // e.g., onUpdate(editedDevice)
    setIsEditing(false);
  };

  const copyDeviceId = () => {
    navigator.clipboard.writeText(device.deviceId);
  };

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

          {/* Trick to center the modal content */}
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
              {/* Header */}
              <div className="flex justify-between items-center">
                <Dialog.Title as="h2" className="text-xl font-bold text-white">
                  Device Details
                </Dialog.Title>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              {/* Device Image & Name */}
              <div className="flex items-center gap-4 mt-4">
                <Image src="/device.png" alt="Device" width={80} height={80} />
                <div>
                  <p className="text-gray-400 text-sm">Device name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedDevice.name}
                      onChange={handleChange}
                      className="bg-[#303030] text-white px-2 py-1 rounded-md w-full"
                    />
                  ) : (
                    <p className="text-lg font-bold text-white">{device.name}</p>
                  )}
                </div>
                {!isEditing && (
                  <button
                    onClick={handleEdit}
                    className="flex items-center bg-gray-600 px-2 py-1 rounded-md text-xs text-white"
                  >
                    <Pencil size={14} className="mr-1" /> Edit
                  </button>
                )}
              </div>

              {/* Device ID */}
              <div className="mt-3 flex items-center gap-2">
                <p className="text-gray-400 text-sm">Device ID</p>
                <p className="text-lg font-bold text-white">{device.deviceId}</p>
                <button onClick={copyDeviceId} className="text-gray-400 hover:text-white">
                  <Clipboard size={16} />
                </button>
              </div>

              {/* Device Details */}
              <div className="grid grid-cols-2 gap-4 mt-4 text-white">
                <div>
                  <p className="text-gray-400 text-sm">Activation date</p>
                  <p className="font-bold">{device.activationDate}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={editedDevice.location}
                      onChange={handleChange}
                      className="bg-[#303030] text-white px-2 py-1 rounded-md w-full"
                    />
                  ) : (
                    <p className="font-bold">{device.location}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Last active date</p>
                  <p className="font-bold">{device.lastActiveDate}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Last runtime</p>
                  <p className="font-bold">{device.lastRuntime}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Device status</p>
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-bold ${
                      device.status === "Active" ? "bg-green-500" : "bg-gray-500"
                    }`}
                  >
                    {device.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Battery percentage</p>
                  <p className="font-bold">{device.battery}%</p>
                </div>
              </div>

              {/* Remove Device Button */}
              {!isEditing && (
                <div className="flex justify-end mt-6">
                  <button
                    onClick={onRemoveClick}
                    className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
                  >
                    <Trash2 size={16} /> Remove device
                  </button>
                </div>
              )}

              {/* Save Button (if editing) */}
              {isEditing && (
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-black font-bold py-2 px-4 rounded-lg"
                  >
                    Save Changes
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
