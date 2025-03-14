"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import AuthGuard from "./AuthGuard";

interface AuthProviderProps {
  children: ReactNode;
  session?: any;
  requireAuth?: boolean;
}

export default function AuthProvider({ children, session, requireAuth = false }: AuthProviderProps) {
  return (
    <SessionProvider session={session}>
      <AuthGuard requireAuth={requireAuth}>{children}</AuthGuard>
    </SessionProvider>
  );
}