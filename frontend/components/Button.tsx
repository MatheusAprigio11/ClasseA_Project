import { COLORS, SIZES } from "@/constants/theme";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  isLoading = false,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: SIZES.h3,
  },
});

export default AppButton;
