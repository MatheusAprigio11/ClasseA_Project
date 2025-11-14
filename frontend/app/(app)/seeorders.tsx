import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import OrderCard from "@/components/OrderCard";

export default function SeeOrders() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.ordersSection}>
        <Text style={styles.sectionTitle}>Pedidos Recentes</Text>
        
        <OrderCard
          id="001"
          customerName="João Silva"
          orderDate="13/11/2025"
          status="pending"
          totalValue={150.50}
          itemsCount={3}
          onPress={() => console.log('Pedido 001 clicado')}
        />

        <OrderCard
          id="002"
          customerName="Maria Santos"
          orderDate="13/11/2025"
          status="processing"
          totalValue={299.90}
          itemsCount={5}
          onPress={() => console.log('Pedido 002 clicado')}
        />

        <OrderCard
          id="003"
          customerName="Pedro Oliveira"
          orderDate="12/11/2025"
          status="completed"
          totalValue={89.90}
          itemsCount={2}
          onPress={() => console.log('Pedido 003 clicado')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  ordersSection: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
    marginBottom: 8,
  },
});