"use client";
import { useAuth } from "@/features/auth/login/hooks/use-auth";
import UserHistory from "@/features/user-history/components/UserHistory";

export default function UserHistoryPage() {
  const { isChecking } = useAuth();
  if (isChecking) return null; 
  return <UserHistory/> 
}