import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import OrderCard from "@/components/OrderCard";
import { apiClient } from "@/api/api";
import { useAuthStore } from "@/store/authStore";
import { useFocusEffect } from "@react-navigation/native";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
}

interface OrderResponse {
  id: number;
  orderRequestedBy: string;
  createdAt: string;
  totalValue: number;
  items: OrderItem[];
}

export default function OrderScreen() {
  const { token, userRole } = useAuthStore((state) => state);

  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = userRole === "ADMIN" ? "/orders" : "/orders/user";

      const response = await apiClient.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      

      setOrders(response.data);
    } catch (err) {
      console.log("Error loading orders:", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [loadOrders])
  );

  const toggleExpand = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.ordersSection}>
        <Text style={styles.sectionTitle}>Pedidos Recentes</Text>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#000"
            style={{ marginTop: 20 }}
          />
        )}

        {error && <Text style={styles.errorText}>{error}</Text>}

        {!loading && orders.length === 0 && (
          <Text style={styles.emptyText}>Nenhum pedido encontrado</Text>
        )}

        {orders.map((order) => (
          <View key={order.id}>
            <OrderCard
              id={order.id.toString()}
              customerName={order.orderRequestedBy}
              orderDate={new Date(order.createdAt).toLocaleString("pt-BR")}
              totalValue={order.totalValue}
              itemsCount={order.items.reduce((acc, item) => acc + item.quantity, 0)}
              onPress={() => toggleExpand(order.id)}
            />

            {expandedOrderId === order.id && (
              <View style={styles.detailsBox}>
                <Text style={styles.detailsTitle}>Detalhes do Pedido</Text>

                {order.items.map((item) => (
                  <View key={item.id} style={styles.detailsItem}>
                    <Text style={styles.productName}>
                      {item.product.name} x {item.quantity}
                    </Text>
                    <Text style={styles.productPrice}>
                      R$ {(item.unitPrice * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  ordersSection: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 16,
    marginBottom: 12,
    marginTop: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 30,
  },
  detailsBox: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  detailsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#28a745",
  },
});
