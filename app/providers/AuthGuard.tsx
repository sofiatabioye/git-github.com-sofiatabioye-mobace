"use client";

import { useRouter } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

export default function AuthGuard({ children, requireAuth = false }: { children: ReactNode; requireAuth?: boolean }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    console.log(session)
  
    useEffect(() => {
      // Avoid redirecting while session status is still loading
      if (status === "loading") return;
  
      // If page requires authentication and no session is found, redirect to login
      if (requireAuth && !session) {
        router.replace("/auth/login");
      }
      // If page is for non-authenticated users but a session exists, redirect to dashboard
      else if (!requireAuth && session) {
        router.replace("/dashboard");
      }
    }, [session, status, router, requireAuth]);
  
    // Optionally, render a loader while waiting for session data if authentication is required
    if (requireAuth && status === "loading") {
      return <div>Loading...</div>;
    }
  
    return <>{children}</>;
  }
