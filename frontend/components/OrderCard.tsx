import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface OrderCardProps {
  id: string;
  customerName: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  totalValue: number;
  itemsCount: number;
  onPress?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  id,
  customerName,
  orderDate,
  status,
  totalValue,
  itemsCount,
  onPress,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return '#FFA500';
      case 'processing':
        return '#2196F3';
      case 'completed':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'processing':
        return 'Em Processamento';
      case 'completed':
        return 'Concluído';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.orderId}>Pedido #{id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Cliente:</Text>
          <Text style={styles.value}>{customerName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.value}>{orderDate}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Itens:</Text>
          <Text style={styles.value}>{itemsCount} {itemsCount === 1 ? 'item' : 'itens'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.totalValue}>
            R$ {totalValue.toFixed(2).replace('.', ',')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
  },
  content: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '400',
  },
  totalValue: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '700',
  },
});

export default OrderCard;