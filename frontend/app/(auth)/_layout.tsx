import React from "react";
import { Stack } from "expo-router";

const AuthLayout: React.FC = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="login-home" />
    <Stack.Screen name="login" />
    <Stack.Screen name="register" />
    <Stack.Screen name="forgot-password" />
    <Stack.Screen name="reset-password" />
  </Stack>
);

export default AuthLayout;