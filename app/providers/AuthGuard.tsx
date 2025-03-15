"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

export default function AuthGuard({
  children,
  requireAuth = false,
}: {
  children: ReactNode;
  requireAuth?: boolean;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (requireAuth && !session) {
      router.replace("/auth/login");
    } else if (!requireAuth && session) {
      router.replace("/dashboard");
    }
  }, [session, status, router, requireAuth]);

  // Improved Loading State
  if (requireAuth && status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-[#222] text-white">
        <div className="flex flex-col items-center space-y-4">
          <svg
            className="animate-spin h-10 w-10 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <p className="text-lg font-semibold">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
