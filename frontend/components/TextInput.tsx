import React from "react";
import { StyleSheet, TextInput, TextInputProps, View, Text, ViewStyle, TextStyle } from "react-native";
import { COLORS, SIZES } from "@/constants/theme";

interface AppTextInputProps extends TextInputProps {
  error?: string;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const AppTextInput: React.FC<AppTextInputProps> = React.memo(
  ({ error, style, inputStyle, containerStyle, ...props }) => {
    const combinedInputStyle = [
      styles.input,
      error ? styles.errorBorder : null,
      inputStyle,
      style,
    ];

    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput
          style={combinedInputStyle}
          placeholderTextColor={COLORS.textLight}
          {...props}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    );
  }
);

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
  errorText: {
    color: COLORS.error,
    fontSize: SIZES.caption,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default AppTextInput;