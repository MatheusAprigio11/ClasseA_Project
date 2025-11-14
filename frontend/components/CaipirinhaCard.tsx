import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "@/constants/theme";

interface CaipirinhaCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  onPress: () => void;
}

const CaipirinhaCard: React.FC<CaipirinhaCardProps> = ({
  name,
  description,
  price,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{name}</Text>
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>
            R$ {price.toFixed(2).replace(".", ",")}
          </Text>
        </View>
      </View>

      <Text style={styles.cardDescription} numberOfLines={2}>
        {description}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginRight: 12,
  },
  priceBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceText: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: "700",
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
  },
});

export default CaipirinhaCard;