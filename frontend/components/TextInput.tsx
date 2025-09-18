import { COLORS, SIZES } from "@/constants/theme";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface AppTextInputProps extends TextInputProps {
  error?: string;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  error,
  style,
  ...props
}) => {
  const inputStyle = [styles.input, error ? styles.errorBorder : null, style];

  return (
    <View style={styles.container}>
      <TextInput
        style={inputStyle}
        placeholderTextColor={COLORS.textLight}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: SIZES.padding,
  },
  input: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  errorBorder: {
    borderColor: COLORS.error,
  },
});

export default AppTextInput;
