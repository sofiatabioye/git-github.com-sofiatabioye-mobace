"use client";

import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-white text-lg font-bold">Dashboard</h1>
      <button
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </nav>
  );
}
