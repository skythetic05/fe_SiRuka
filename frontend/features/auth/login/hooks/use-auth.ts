"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";

export const useAuth = () => {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    useEffect(() => {
        const token = authService.getToken();
        if (!token) {
        router.replace("/login");
        } else {
        setIsChecking(false);
        }
    }, [router]);
    return { isChecking };
};