"use client";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function DashboardHeader() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <header className="bg-[#222222] px-4 py-4 flex justify-between items-center">
    <div className="flex items-center gap-3">
    {/* Navigation Buttons */}
    <button
      onClick={() => router.back()}
      className="bg-[#303030] p-2 rounded-lg flex items-center justify-center"
    >
      <ChevronLeft size={18} className="text-white" />
    </button>
    <button
      onClick={() => router.forward()}
      className="bg-[#303030] p-2 rounded-lg flex items-center justify-center"
    >
      <ChevronRight size={18} className="text-white" />
    </button>

    {/* Welcome Message */}
    <h1 className="text-xl font-bold text-white">Hello, {session?.user.name.split(' ')[0]}</h1>
    </div>
    <div className="relative w-72 hidden md:block">
      <input
        type="text"
        placeholder="Search your dashboard"
        className="w-full bg-[#303030] text-white px-4 py-2 rounded-full pl-10"
      />
      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
    </div>
  </header>
  );
}
