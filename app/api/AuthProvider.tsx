import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

interface AuthProviderProps {
  children: React.ReactNode;
  requireAuth?: boolean; // If true, user must be logged in
  redirectOnAuth?: boolean; // If true, logged-in users get redirected to dashboard
}

export default async function AuthProvider({ children, requireAuth, redirectOnAuth }: AuthProviderProps) {
  const session = await getServerSession(authOptions);
  console.log(session)

  if (requireAuth && !session) {
    redirect("/auth/login"); // Redirect if user is not logged in
  }

  if (redirectOnAuth && session) {
    redirect("/dashboard"); // Redirect logged-in users to dashboard
  }

  return <>{children}</>;
}
