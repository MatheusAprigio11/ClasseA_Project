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
import AppTextInput from "@/components/TextInput";
import { useCart } from "@/components/CartContext";
import { COLORS, SIZES } from "@/constants/theme";

interface CartItem {
  caipirinha: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

const CartItemCard: React.FC<{
  item: CartItem;
  onUpdateQuantity: (newQuantity: number) => void;
  onRemove: () => void;
}> = ({ item, onUpdateQuantity, onRemove }) => {
  const subtotal = item.caipirinha.price * item.quantity;

  return (
    <View style={styles.cartItem}>
      <View style={styles.cartItemHeader}>
        <Text style={styles.cartItemName}>{item.caipirinha.name}</Text>
        <TouchableOpacity onPress={onRemove} activeOpacity={0.7}>
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
            onPress={() => onUpdateQuantity(item.quantity - 1)}
            activeOpacity={0.7}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onUpdateQuantity(item.quantity + 1)}
            activeOpacity={0.7}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtotal}>
          R$ {subtotal.toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </View>
  );
};

export default function CartScreen() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalValue } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [observations, setObservations] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    customerName?: string;
    phone?: string;
    address?: string;
  }>({});

  const handleRemoveItem = (index: number) => {
    Alert.alert(
      "Remover item",
      "Deseja remover este item do carrinho?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => removeFromCart(index),
        },
      ]
    );
  };

  const validateForm = (): boolean => {
    const newErrors: {address?: string } = {};

    if (!address.trim()) {
      newErrors.address = "Endereço é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinishOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Atenção", "Seu carrinho está vazio");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simula chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const orderData = {
        customerName,
        phone,
        address,
        observations,
        items: cartItems.map((item) => ({
          caipirinhaId: item.caipirinha.id,
          quantity: item.quantity,
        })),
        total: getTotalValue(),
      };

      console.log("Pedido finalizado:", orderData);

      Alert.alert(
        "Pedido Confirmado! 🎉",
        `Cliente: ${customerName}\nTelefone: ${phone}\nEndereço: ${address}\nTotal: R$ ${getTotalValue().toFixed(2).replace(".", ",")}`,
        [
          {
            text: "OK",
            onPress: () => {
              // Limpa o carrinho e formulário
              clearCart();
              setCustomerName("");
              setPhone("");
              setAddress("");
              setObservations("");
              setErrors({});
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível finalizar o pedido");
    } finally {
      setLoading(false);
    }
  };

  const renderCartItem = ({ item, index }: { item: CartItem; index: number }) => (
    <CartItemCard
      item={item}
      onUpdateQuantity={(qty) => updateQuantity(index, qty)}
      onRemove={() => handleRemoveItem(index)}
    />
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🛒</Text>
      <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
      <Text style={styles.emptySubtext}>
        Adicione caipirinhas para fazer um pedido
      </Text>
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
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item, index) => `${item.caipirinha.id}-${index}`}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Informações de Entrega</Text>

              <Text style={styles.label}>Endereço Completo *</Text>
              <AppTextInput
                placeholder="Rua, número, bairro, complemento"
                value={address}
                onChangeText={(text) => setAddress(text)}
                error={errors.address}
                multiline
                numberOfLines={2}
                inputStyle={styles.addressArea}
                autoCapitalize="words"
              />

              <Text style={styles.label}>Observações</Text>
              <AppTextInput
                placeholder="Alguma observação? (opcional)"
                value={observations}
                onChangeText={(text) => setObservations(text)}
                multiline
                numberOfLines={3}
                inputStyle={styles.textArea}
                autoCapitalize="sentences"
              />
            </View>
          }
        />
      ) : (
        renderEmptyCart()
      )}

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total do Pedido</Text>
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
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: SIZES.padding,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  listContent: {
    padding: SIZES.padding,
    paddingBottom: 20,
  },
  cartItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cartItemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  removeButton: {
    fontSize: 20,
  },
  cartItemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartItemPrice: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: "500",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    minWidth: 24,
    textAlign: "center",
  },
  subtotal: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
  },
  formSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  addressArea: {
    height: 60,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  footer: {
    backgroundColor: "#FFFFFF",
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: SIZES.padding,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
  },
});