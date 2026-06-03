"use client";
import { useAuth } from "@/features/auth/login/hooks/use-auth";
import UserRuangan from "@/features/user-ruangan/components/UserRuangan";


export default function UserRuanganPage() {
  const { isChecking } = useAuth();
  if (isChecking) return null; 
  return <UserRuangan/> 
}