"use client";
import { useAuth } from "@/features/auth/login/hooks/use-auth";
import JadwalForm from "@/features/jadwal/components/jadwal-form"

export default function JadwalPage() {
  const { isChecking } = useAuth();
  if (isChecking) return null; 
  return (
        <JadwalForm />
  )
}