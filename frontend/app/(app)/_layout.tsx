import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useCart } from "@/components/CartContext";

export default function AppLayout() {
  const { logout } = useAuthStore();
  const { clearCart } = useCart();
  
  const handleLogout = () => {
    clearCart()
    logout()
  }

  const LogoutButton = () => (
    <TouchableOpacity onPress={handleLogout}>
      <Ionicons name="log-out-outline" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <Tabs
      screenOptions={{
        headerRight: LogoutButton,
      }}
    >
      <Tabs.Screen
        name="products"
        options={{
          title: "Caipirinhas",
          tabBarIcon: ({ color }) => (
            <Ionicons name="wine-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Carrinho",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Pedidos",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list-circle-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="createOrEditProduct"
        options={{
          title: "Nova Caipirinha",
          href: null,
        }}
      />

    </Tabs>
  );
}