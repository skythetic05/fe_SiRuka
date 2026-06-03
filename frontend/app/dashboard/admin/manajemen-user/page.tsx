"use client";
import { useAuth } from "@/features/auth/login/hooks/use-auth";
import MUTable from "@/features/manajemen-user/components/MUTable"

export default function MUPage() {
  const { isChecking } = useAuth();
  if (isChecking) return null; 
  return <MUTable />
}