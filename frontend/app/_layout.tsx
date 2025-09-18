import React, { JSX, useEffect, useState } from "react"; 
import { useAuthStore } from "@/store/authStore";
import { Slot, useRouter, useSegments, usePathname } from "expo-router";

export default function RootLayout(): JSX.Element {
  const token: string | null = useAuthStore((state) => state.token);
  const segments = useSegments();
  const pathname = usePathname();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // marca que o layout foi montado
  }, []);

  useEffect(() => {
    if (!mounted || !segments) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inAppGroup = segments[0] === "(app)";
    const inRootIndex = pathname === "/";

    if (inRootIndex) {
      if (token) router.replace("/home");
      else router.replace("/login");
    }

    if (!token && inAppGroup) router.replace("/login");
    if (token && inAuthGroup) router.replace("/home");
  }, [mounted, token, segments, pathname, router]);

  return <Slot />; // Slot sempre é renderizado primeiro
}