import { useState } from "react";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { Device, useDashboard } from "../dashboard/DashboardContext";
import DeviceModal from "./DeviceModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";
import RemovalSuccessModal from "./RemovalSuccessModal";
import { useRouter } from "next/navigation";

export default function DeviceDetails({device, index}: {device: Device, index: number}) {
    const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [error, setError] = useState<String | null>(null);
    const { deleteDevice, setSelectedDevice } = useDashboard();
    const router = useRouter();

     // Step 1: Click "Remove device" inside the device modal
    const handleRemoveClick = () => {
        setIsDeviceModalOpen(false);
        setIsConfirmModalOpen(true);
    };

    // Step 2a: Cancel removal in confirmation modal
    const handleCancelRemoval = () => {
        setIsConfirmModalOpen(false);
        setIsDeviceModalOpen(true);
    };

    // Step 2b: Confirm removal
    const handleConfirmRemoval = async (deviceId: string) => {
        try {
          await deleteDevice(deviceId);
        } catch(err: any){
          setError(err.message)
        }
        // Then show the success modal
        setIsConfirmModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    // Step 3: Close success modal
    const handleCloseSuccess = () => {
        setIsSuccessModalOpen(false);
    };

    const handleClick = () => {
        setSelectedDevice(device)
        router.push("/dashboard")
    }
    return (
         <div key={index} className="flex items-center rounded-2xl bg-[#222222]" >
            {error && <p className="text-red-600 py-2 text-center">{error}</p>}
            {/* Device Image */}
            <div className="rounded-2xl p-4 pl-6" style={{ background: "linear-gradient(304.87deg, rgba(34, 34, 34, 0.08) -1.17%, rgba(34, 34, 34, 0.1) 38.73%, rgba(121, 121, 121, 0.2) 54.24%, #CACACA 98.82%)" }}>
            <Image src="/device.png" alt="device" height={120} width={120} />
            </div>
            <div className="flex w-full justify-around">
            {/* Device Info */}
            <div className="ml-4">
                <div className="flex items-center gap-2">
                <h3 className="font-bold text-white">{device.name}</h3>
                <button className="bg-[#393939] p-2 rounded-lg"  onClick={() => setIsDeviceModalOpen(true)}>
                    <Pencil size={14} color="white" fill="white" stroke="black" />
                </button>
                </div>
                <p className="text-[#8E8E8E] text-sm">{device.id}</p>
            </div>
            
            {/* Device Location */}
            <div className="text-right mr-6">
                <p className="text-[#8E8E8E] text-xs">Current location</p>
                <p className="font-bold text-white">{device.location}</p>
            </div>
            
            {/* Status */}
            <span className={`bg-[#303030] ${device.status === 'active'? 'text-[#1FC16B]': 'text-red-600'} capitalize py-1 px-4 py-0 text-xs font-bold rounded-3xl flex items-center gap-2`}>
            ● {device.status}
            </span>
            
            {/* View Details Button */}
            <button className="ml-4 bg-[#393939] px-4 py-2 rounded-xl text-white font-bold text-xs" onClick={handleClick}>
                View full details
            </button>
            </div>
             {/* Device Details Modal */}
            <DeviceModal
                isOpen={isDeviceModalOpen}
                onClose={() => setIsDeviceModalOpen(false)}
                device={device}
                onRemoveClick={handleRemoveClick}
            />
    
            {/* Confirm Removal Modal (image 1) */}
            <ConfirmRemovalModal
                isOpen={isConfirmModalOpen}
                onClose={handleCancelRemoval} // If user cancels, go back
                onConfirm={() => handleConfirmRemoval(device.id)}
            />
    
            {/* Removal Success Modal (image 2) */}
            <RemovalSuccessModal
                isOpen={isSuccessModalOpen}
                deviceName={device.name}
                onClose={handleCloseSuccess}
            />
        </div>
    )
}