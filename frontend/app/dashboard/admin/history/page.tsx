"use client";
import { useAuth } from "@/features/auth/login/hooks/use-auth";
import HistoryTable from "@/features/history/components/history-table"

export default function HistoryPage() {
  const { isChecking } = useAuth();
  if (isChecking) return null; 
  return <HistoryTable />
}