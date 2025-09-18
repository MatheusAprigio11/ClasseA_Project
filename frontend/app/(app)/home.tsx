import React from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-8">
      <Text className="text-3xl font-bold mb-8">Bem-vindo!</Text>
      <Text className="text-lg text-center mb-8">
        Você está autenticado usando Expo Router.
      </Text>
    </View>
  );
}
