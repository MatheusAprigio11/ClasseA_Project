import { apiClient } from "@/api/api";
import CaipirinhaCard from "@/components/CaipirinhaCard";
import { useCart } from "@/components/CartContext";
import Spinner from "@/components/Spinner";
import { COLORS, SIZES } from "@/constants/theme";
import { useAuthStore } from "@/store/authStore";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

type NavigationProp = {
  navigate: (screen: string, params?: any) => void;
};

export default function ProductsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { token, userRole } = useAuthStore();
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = useCallback(async () => {
    if (!token) {
      return;
    }

    try {
      setLoading(true);

      const res = await apiClient.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const list = Array.isArray(res.data) ? res.data : [];
      setProducts(list);

    } catch (error) {
      console.error("Failed to fetch products:", error);
      Alert.alert("Erro", "Não foi possível carregar os produtos.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [loadProducts])
  );

  const handleOpenDetails = useCallback(
    (item: Product) => {
      const buttons: any[] = [
        { text: "Fechar", style: "cancel" },
      ];

      if (userRole === "ADMIN") {
        buttons.push(
          {
            text: "Editar",
            onPress: () =>
              navigation.navigate("createOrEditProduct", { id: item.id }),
          },
          {
            text: "Deletar",
            onPress: () => handleDeleteProduct(item.id),
          }
        );
      }

      Alert.alert(
        item.name,
        `${item.description}\n\nPreço: R$ ${item.price
          .toFixed(2)
          .replace(".", ",")}`,
        buttons
      );
    },
    [userRole]
  );

  const handleAddToCartPress = useCallback(
    (item: Product) => {
      try {
        addToCart(item, 1);
        Alert.alert("Adicionado", `${item.name} adicionado ao carrinho.`);
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Não foi possível adicionar ao carrinho.");
      }
    },
    [addToCart]
  );

  const handleDeleteProduct = useCallback(
    async (id: string) => {
      Alert.alert("Confirmar", "Tem certeza que deseja remover este produto?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              await apiClient.delete(`/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });

              setProducts((prev) => prev.filter((p) => p.id !== id));
              Alert.alert("Removido", "Produto removido com sucesso.");
            } catch (err) {
              console.error(err);
              Alert.alert("Erro", "Não foi possível remover o produto.");
            }
          },
        },
      ]);
    },
    [token]
  );

  const navigateToCreateProduct = () => {
    navigation.navigate("createOrEditProduct");
  };

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderText}>
        {products.length}{" "}
        {products.length === 1 ? "caipirinha" : "caipirinhas"} no cardápio
      </Text>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>🍹</Text>
      <Text style={styles.emptyText}>Nenhuma caipirinha cadastrada</Text>
      <Text style={styles.emptySubtext}>
        Adicione sua primeira caipirinha ao cardápio
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.itemRow}>
      <CaipirinhaCard
        id={item.id}
        name={item.name}
        description={item.description}
        price={item.price}
        onPress={() => handleOpenDetails(item)}
      />

      <View style={styles.actionsContainer}>
        {/* Add to cart */}
        <TouchableOpacity
          style={styles.addButtonLeft}
          onPress={() => handleAddToCartPress(item)}
        >
          <Ionicons name="cart-outline" size={22} color="white" />
        </TouchableOpacity>

      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cardápio</Text>
        <Text style={styles.subtitle}>Caipirinhas disponíveis</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyList}
        ListHeaderComponent={products.length > 0 ? renderHeader : undefined}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {userRole === "ADMIN" && (
        <TouchableOpacity style={styles.fab} onPress={navigateToCreateProduct}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}

      {loading && <Spinner />}
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

  listHeader: {
    marginBottom: 12,
  },

  listHeaderText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: "500",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },

  emptyTitle: {
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

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 8,
    gap: 12,
  },

  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  addButtonLeft: {
    width: 44,
    height: 100,
    minWidth: 40,
    minHeight: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    right: 20,
    bottom: 30,
    elevation: 8,
  },

  fabText: {
    fontSize: 30,
    color: "white",
    marginTop: -2,
  },
});
