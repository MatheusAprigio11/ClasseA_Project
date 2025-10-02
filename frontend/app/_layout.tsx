import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Slot, useRouter, useSegments, usePathname } from "expo-router";

const RootLayout: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const segments = useSegments();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !segments) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inAppGroup = segments[0] === "(app)";
    const inRootIndex = pathname === "/";

    if (inRootIndex) {
      if (token) {
        router.replace("/home");
      } else {
        router.replace("/login-home");
      }
    } else if (!token && inAppGroup) {
      router.replace("/login");
    } else if (token && inAuthGroup) {
      router.replace("/home");
    }
  }, [mounted, token, segments, pathname]);

  return <Slot />;
};

export default RootLayout;