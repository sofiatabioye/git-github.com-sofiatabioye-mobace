"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <div className="bg-gray-800 p-6 rounded-lg mt-6">
          <h2 className="text-xl font-semibold">Preferences</h2>
          <div className="flex items-center justify-between mt-4">
            <span>Email Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
