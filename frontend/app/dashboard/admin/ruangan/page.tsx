"use client";
import { useAuth } from "@/features/auth/login/hooks/use-auth";
import RuanganTable from "@/features/ruangan/components/RuanganTable"

export default function HistoryPage() {
  const { isChecking } = useAuth();
  if (isChecking) return null; 
  return <RuanganTable/>
}