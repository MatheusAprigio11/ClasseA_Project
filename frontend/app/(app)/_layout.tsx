import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function AppLayout() {
  const { logout } = useAuthStore();

  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          title: "Página Inicial",
          headerRight: () => (
            <TouchableOpacity onPress={logout}>
              <Ionicons name="log-out-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
