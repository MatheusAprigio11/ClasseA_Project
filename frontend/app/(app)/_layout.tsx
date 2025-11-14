import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { CartProvider } from "@/components/CartContext";// Ajuste o caminho conforme necessário

export default function AppLayout() {
  const { logout } = useAuthStore();

  return (
    <CartProvider>
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
        <Stack.Screen
          name="seeorders"
          options={{
            title: "Orders",
            headerRight: () => (
              <TouchableOpacity onPress={logout}>
                <Ionicons name="log-out-outline" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="createProductScreen"
          options={{
            title: "New Product",
            headerRight: () => (
              <TouchableOpacity onPress={logout}>
                <Ionicons name="log-out-outline" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="caipirinhasListScreen"
          options={{
            title: "List Caipirinhas",
            headerRight: () => (
              <TouchableOpacity onPress={logout}>
                <Ionicons name="log-out-outline" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="CreateOrderScreen"
          options={{
            title: "Order",
            headerRight: () => (
              <TouchableOpacity onPress={logout}>
                <Ionicons name="log-out-outline" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="CartScreen"
          options={{
            title: "Cart",
            headerRight: () => (
              <TouchableOpacity onPress={logout}>
                <Ionicons name="log-out-outline" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </CartProvider>
  );
}