import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import { COLORS, SIZES } from "@/constants/theme";

/**
 * Props para o componente AppButton.
 */
interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const AppButton: React.FC<AppButtonProps> = React.memo(
  ({
    title,
    isLoading = false,
    style,
    buttonStyle,
    textStyle,
    disabled,
    ...props
  }) => {
    const isDisabled = isLoading || disabled;

    return (
      <TouchableOpacity
        style={StyleSheet.flatten([
          styles.button,
          buttonStyle,
          style,
          isDisabled && styles.disabled,
        ])}
        disabled={isDisabled}
        activeOpacity={0.7}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={StyleSheet.flatten([styles.text, textStyle])}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
);

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
  disabled: {
    opacity: 0.6,
  },
});

export default AppButton;