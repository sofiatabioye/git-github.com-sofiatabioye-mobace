"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "My Devices", href: "/dashboard/my-devices" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-gray-800 p-4">
      <h2 className="text-xl font-bold text-white mb-6">Control Panel</h2>
      <nav>
        {navItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <div
              className={`p-3 rounded-lg cursor-pointer ${
                pathname === item.href ? "bg-blue-500" : "hover:bg-gray-700"
              }`}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
