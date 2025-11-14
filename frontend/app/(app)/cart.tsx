import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import CustomButton from "@/components/Button";
import { useCart } from "@/components/CartContext";
import { COLORS, SIZES } from "@/constants/theme";
import { apiClient } from "@/api/api";
import { useAuthStore } from "@/store/authStore";

interface CartItem {
  caipirinha: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

export default function CartScreen() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalValue } = useCart();
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ address?: string }>({});

  const handleFinishOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Atenção", "Seu carrinho está vazio");
      return;
    }

    setLoading(true);

    const body = {
      totalValue: getTotalValue(),
      items: cartItems.map(item => ({
        productId: Number(item.caipirinha.id),
        quantity: item.quantity,
        unitPrice: item.caipirinha.price
      }))
    };

    try {
      const res = await apiClient.post(`/orders`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert(
        "Pedido Confirmado! 🎉",
        `Para mais informações sobre o seu pedido, veja na aba "Pedidos".`,
        [
          {
            text: "OK",
            onPress: () => {
              clearCart();
              setErrors({});
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar o pedido");
      console.error("Erro ao criar pedido:", error);
    } finally {
      setLoading(false);
    }
  };

  const CartItemCard = ({ item, index }: { item: CartItem; index: number }) => (
    <View style={styles.cartItem}>
      <View style={styles.cartItemHeader}>
        <Text style={styles.cartItemName}>{item.caipirinha.name}</Text>

        <TouchableOpacity
          onPress={() =>
            Alert.alert("Remover", "Remover este item?", [
              { text: "Cancelar" },
              {
                text: "Remover",
                style: "destructive",
                onPress: () => removeFromCart(index),
              },
            ])
          }
        >
          <Text style={styles.removeButton}>🗑️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemPrice}>
          R$ {item.caipirinha.price.toFixed(2).replace(".", ",")}
        </Text>

        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(index, item.quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(index, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtotal}>
          R$ {(item.caipirinha.price * item.quantity)
            .toFixed(2)
            .replace(".", ",")}
        </Text>
      </View>
    </View>
  );

  const EmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🛒</Text>
      <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
    </View>
  );

  const totalValue = getTotalValue();
  const totalItems = getTotalItems();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Carrinho</Text>
        <Text style={styles.subtitle}>
          {totalItems} {totalItems === 1 ? "item" : "itens"}
        </Text>
      </View>

      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => `${item.caipirinha.id}-${index}`}
            renderItem={({ item, index }) => (
              <CartItemCard item={item} index={index} />
            )}
            contentContainerStyle={styles.listContent}
          />
        </>
      ) : (
        <EmptyCart />
      )}

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              R$ {totalValue.toFixed(2).replace(".", ",")}
            </Text>
          </View>

          <CustomButton
            title="Finalizar Pedido"
            onPress={handleFinishOrder}
            isLoading={loading}
            type="primary"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: SIZES.padding,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: { fontSize: 28, fontWeight: "700", color: COLORS.text },
  subtitle: { fontSize: 14, color: COLORS.textLight },
  listContent: { padding: SIZES.padding, paddingBottom: 20 },

  cartItem: {
    backgroundColor: "#fff",
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: 12,
    elevation: 3,
  },
  cartItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cartItemName: { fontSize: 16, fontWeight: "700", color: COLORS.text },
  removeButton: { fontSize: 20 },
  cartItemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartItemPrice: { fontSize: 14, color: COLORS.textLight },
  quantityControl: { flexDirection: "row", alignItems: "center", gap: 8 },
  quantityButton: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  quantityText: { fontSize: 16, fontWeight: "700", minWidth: 24, textAlign: "center" },
  subtotal: { fontSize: 16, fontWeight: "700", color: COLORS.primary },

  formSection: {
    backgroundColor: "#fff",
    padding: SIZES.padding,
    marginHorizontal: SIZES.padding,
    marginBottom: 12,
    borderRadius: SIZES.radius,
  },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  addressArea: { height: 60, textAlignVertical: "top" },

  footer: {
    backgroundColor: "#fff",
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  totalLabel: { fontSize: 18, fontWeight: "600", color: COLORS.text },
  totalValue: { fontSize: 24, fontWeight: "700", color: COLORS.primary },

  emptyContainer: {
    flex: 1, justifyContent: "center", alignItems: "center",
    paddingTop: 100,
  },
  emptyIcon: { fontSize: 64 },
  emptyText: { fontSize: 18, fontWeight: "600", marginTop: 16 },
});
