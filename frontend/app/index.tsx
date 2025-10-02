import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { COLORS } from "@/constants/theme";

const StartPage: React.FC = React.memo(() => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={COLORS.primary} />
  </View>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
});

export default StartPage;