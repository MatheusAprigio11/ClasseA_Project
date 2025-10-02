import React from 'react';
import { ActivityIndicator, TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SIZES } from "@/constants/theme";

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  fullWidth?: boolean;
  type?: 'primary' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
    title, 
    onPress,
    isLoading = false,
    fullWidth = true,
    type = 'primary', 
    style,
    textStyle
}) => {
    
    const buttonStyle: ViewStyle = type === 'primary' 
        ? styles.primaryButton 
        : styles.secondaryButton;
    
    const buttonTextStyle: TextStyle = type === 'primary' 
        ? styles.primaryButtonText 
        : styles.secondaryButtonText;

    const activityIndicatorColor: string = type === 'primary' 
        ? COLORS.secondary 
        : COLORS.primary;

    const buttonSizeStyle = fullWidth 
        ? styles.fullWidth
        : styles.flexSize;

    return (
        <TouchableOpacity 
            style={[styles.buttonBase, buttonStyle, buttonSizeStyle, style]}
            onPress={onPress}
            activeOpacity={0.7}
        >
          {isLoading ? (
            <ActivityIndicator color={activityIndicatorColor} />
          ) : (
            <Text style={[buttonTextStyle, textStyle]}>{title}</Text>
          )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonBase: {
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    fullWidth: {
        width: '100%',
    },

    flexSize: {
        flex: 1
    },

    primaryButton: {
        backgroundColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    primaryButtonText: {
        color: COLORS.secondary,
        fontSize: 16,
        fontWeight: '600',
    },

    secondaryButton: {
        backgroundColor: 'transparent',
    },
    secondaryButtonText: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CustomButton;