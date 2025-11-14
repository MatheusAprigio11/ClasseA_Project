import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity, // ADICIONADO
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // ADICIONADO
import CaipirinhaCard from "@/components/CaipirinhaCard";
import { COLORS, SIZES } from "@/constants/theme";

interface Caipirinha {
  id: string;
  name: string;
  description: string;
  price: number;
}

// ADICIONADO: Tipar a navegação (opcional, mas boa prática)
// Substitua 'any' pelo seu tipo de Stack Navigator se o tiver definido
type NavigationProp = {
  navigate: (screen: string) => void;
};

export default function CaipirinhasListScreen() {
  const navigation = useNavigation<NavigationProp>(); // ADICIONADO
  
  // Dados mockados
  const [caipirinhas] = useState<Caipirinha[]>([
    {
      id: "1",
      name: "Caipirinha de Limão",
      description: "Clássica caipirinha brasileira feita com limão fresco, açúcar e cachaça de qualidade.",
      price: 15.00,
    },
    {
      id: "2",
      name: "Caipirinha de Morango",
      description: "Refrescante caipirinha com morangos frescos e um toque especial de hortelã.",
      price: 18.00,
    },
    {
      id: "3",
      name: "Caipirinha de Maracujá",
      description: "Tropical e deliciosa, feita com polpa natural de maracujá.",
      price: 17.00,
    },
    {
      id: "4",
      name: "Caipirinha de Kiwi",
      description: "Exótica combinação de kiwi fresco com cachaça artesanal.",
      price: 19.00,
    },
    {
      id: "5",
      name: "Caipirinha de Abacaxi com Hortelã",
      description: "Sabor tropical do abacaxi combinado com a frescura da hortelã.",
      price: 16.50,
    },
    {
      id: "6",
      name: "Caipirinha de Tangerina",
      description: "Cítrica e refrescante, perfeita para dias quentes.",
      price: 16.00,
    },
  ]);

  const handleCaipirinhaPress = (caipirinha: Caipirinha) => {
    Alert.alert(
      caipirinha.name,
      `${caipirinha.description}\n\nPreço: R$ ${caipirinha.price.toFixed(2).replace(".", ",")}`,
      [
        { text: "Fechar", style: "cancel" },
        { text: "Editar", onPress: () => console.log("Editar", caipirinha.id) },
      ]
    );
  };
  
  // ADICIONADO: Função para navegar
  const handleGoToCreateProduct = () => {
    navigation.navigate("createProductScreen");
  };

  const renderCaipirinha = ({ item }: { item: Caipirinha }) => (
    <CaipirinhaCard
      id={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
      onPress={() => handleCaipirinhaPress(item)}
    />
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

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderText}>
        {caipirinhas.length} {caipirinhas.length === 1 ? "caipirinha" : "caipirinhas"} no cardápio
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cardápio</Text>
        <Text style={styles.subtitle}>Caipirinhas disponíveis</Text>
      </View>

      <FlatList
        data={caipirinhas}
        renderItem={renderCaipirinha}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
        ListHeaderComponent={caipirinhas.length > 0 ? renderHeader : null}
        showsVerticalScrollIndicator={false}
      />
      
      {/* BOTÃO ADICIONADO AQUI */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={handleGoToCreateProduct}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
    paddingTop: 100,
    paddingHorizontal: SIZES.padding,
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
  
  // --- ESTILOS ADICIONADOS ---
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary || '#007AFF', // Usando uma cor primária ou um fallback
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    bottom: 30,
    elevation: 8, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 30,
    color: 'white',
    lineHeight: 30, // Ajuste para centralizar o '+'
    marginTop: -2,  // Ajuste fino vertical
  },
});