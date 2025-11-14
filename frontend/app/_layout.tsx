import { CartProvider } from "@/components/CartContext";
import { useAuthStore } from "@/store/authStore";
import { Slot, usePathname, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";

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
        router.replace("/products");
      } else {
        router.replace("/login-home");
      }
    } else if (!token && inAppGroup) {
      router.replace("/login");
    } else if (token && inAuthGroup) {
      router.replace("/products");
    }
  }, [mounted, token, segments, pathname]);

  return (
    <CartProvider>
      <Slot />
    </CartProvider>
  );
};

export default RootLayout;
