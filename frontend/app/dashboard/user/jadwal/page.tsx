"use client";
import { useAuth } from "@/features/auth/login/hooks/use-auth";
import UserJadwal from "@/features/user-jadwal/components/UserJadwal"

export default function Page() {
  const { isChecking } = useAuth();
  if (isChecking) return null; 
  return <UserJadwal />
  
}