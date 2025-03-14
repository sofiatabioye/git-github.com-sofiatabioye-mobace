"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface RemovalSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  deviceName: string;
}

export default function RemovalSuccessModal({
  isOpen,
  onClose,
  deviceName,
}: RemovalSuccessModalProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={onClose}>
        <div className="flex items-center justify-center min-h-screen p-4 text-center">
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

          {/* Centering trick */}
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-[#222] rounded-lg shadow-xl">
              {/* Close Button (Top Right) */}
              <div className="flex justify-end">
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col items-center">
                {/* Example: trash image again */}
                <Image src="/trash.png" alt="Trash" width={64} height={64} />
                <h2 className="text-2xl font-bold text-white mt-4">Device Removed!</h2>
                <p className="text-gray-400 mt-2">
                  You have successfully removed <strong>[{deviceName}]</strong> from your
                  registered devices.
                </p>
              </div>

              {/* Close Button */}
              <div className="mt-6">
                <button
                  onClick={onClose}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
