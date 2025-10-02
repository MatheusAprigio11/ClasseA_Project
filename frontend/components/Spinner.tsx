import React from 'react';
import { ActivityIndicator, View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '@/constants/theme';

interface SpinnerProps {
  color?: string;
  size?: 'small' | 'large' | number;
  containerStyle?: ViewStyle;
}

const Spinner: React.FC<SpinnerProps> = React.memo(
  ({ color = COLORS.white, size = 'large', containerStyle }) => (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default Spinner;