import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import CustomButton from "@/components/Button";
import { useCart } from "@/components/CartContext";
import { COLORS, SIZES } from "@/constants/theme";

interface Caipirinha {
  id: string;
  name: string;
  description: string;
  price: number;
}

const CaipirinhaSelectCard: React.FC<{
  caipirinha: Caipirinha;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}> = ({ caipirinha, quantity, onAdd, onRemove }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{caipirinha.name}</Text>
          <Text style={styles.cardPrice}>
            R$ {caipirinha.price.toFixed(2).replace(".", ",")}
          </Text>
        </View>

        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={[styles.quantityButton, quantity === 0 && styles.quantityButtonDisabled]}
            onPress={onRemove}
            disabled={quantity === 0}
            activeOpacity={0.7}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={onAdd}
            activeOpacity={0.7}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function CreateOrderScreen() {
  const { addToCart } = useCart();

  // Dados mockados aq bona
  const [caipirinhas] = useState<Caipirinha[]>([
    {
      id: "1",
      name: "Caipirinha de Limão",
      description: "Clássica caipirinha brasileira",
      price: 15.00,
    },
    {
      id: "2",
      name: "Caipirinha de Morango",
      description: "Refrescante com morangos frescos",
      price: 18.00,
    },
    {
      id: "3",
      name: "Caipirinha de Maracujá",
      description: "Tropical e deliciosa",
      price: 17.00,
    },
    {
      id: "4",
      name: "Caipirinha de Kiwi",
      description: "Exótica combinação",
      price: 19.00,
    },
    {
      id: "5",
      name: "Caipirinha de Abacaxi",
      description: "Sabor tropical",
      price: 16.50,
    },
  ]);

  const [orderItems, setOrderItems] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false);

  const handleAddItem = (caipirinhaId: string) => {
    setOrderItems((prev) => ({
      ...prev,
      [caipirinhaId]: (prev[caipirinhaId] || 0) + 1,
    }));
  };

  const handleRemoveItem = (caipirinhaId: string) => {
    setOrderItems((prev) => {
      const newQuantity = (prev[caipirinhaId] || 0) - 1;
      if (newQuantity <= 0) {
        const { [caipirinhaId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [caipirinhaId]: newQuantity };
    });
  };

  const calculateTotal = () => {
    return Object.entries(orderItems).reduce((total, [id, quantity]) => {
      const caipirinha = caipirinhas.find((c) => c.id === id);
      return total + (caipirinha?.price || 0) * quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(orderItems).reduce((sum, qty) => sum + qty, 0);
  };

  const handleAddToCart = () => {
    const totalItems = getTotalItems();

    if (totalItems === 0) {
      Alert.alert("Atenção", "Selecione pelo menos uma caipirinha");
      return;
    }

    setLoading(true);

    try {
      // Adiciona cada item ao carrinho
      Object.entries(orderItems).forEach(([id, quantity]) => {
        const caipirinha = caipirinhas.find((c) => c.id === id);
        if (caipirinha) {
          console.log("Adicionando ao carrinho:", {
            id: caipirinha.id,
            name: caipirinha.name,
            quantity: quantity,
          });
          addToCart(caipirinha, quantity);
        }
      });

      // Limpa a seleção
      setOrderItems({});
      
      // Aguarda um momento para garantir que o estado foi atualizado
      setTimeout(() => {
        setLoading(false);
        // Navega para o carrinho
        router.push("/CartScreen");
      }, 100);
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      Alert.alert("Erro", "Não foi possível adicionar ao carrinho");
      setLoading(false);
    }
  };

  const renderCaipirinha = ({ item }: { item: Caipirinha }) => (
    <CaipirinhaSelectCard
      caipirinha={item}
      quantity={orderItems[item.id] || 0}
      onAdd={() => handleAddItem(item.id)}
      onRemove={() => handleRemoveItem(item.id)}
    />
  );

  const totalItems = getTotalItems();
  const totalValue = calculateTotal();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Novo Pedido</Text>
        <Text style={styles.subtitle}>Selecione as caipirinhas</Text>
      </View>

      <FlatList
        data={caipirinhas}
        renderItem={renderCaipirinha}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total de itens:</Text>
            <Text style={styles.totalValue}>{totalItems}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Valor total:</Text>
            <Text style={styles.totalPrice}>
              R$ {totalValue.toFixed(2).replace(".", ",")}
            </Text>
          </View>
        </View>

        <CustomButton
          title="Adicionar ao Carrinho"
          onPress={handleAddToCart}
          isLoading={loading}
          type="primary"
        />
      </View>
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
  card: {
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
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInfo: {
    flex: 1,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  quantityButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 20,
    textAlign: "center",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    minWidth: 30,
    textAlign: "center",
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
    marginBottom: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.textLight,
    fontWeight: "500",
  },
  totalValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "700",
  },
  totalPrice: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: "700",
  },
});