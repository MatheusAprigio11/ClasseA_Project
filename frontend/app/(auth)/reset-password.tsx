import { apiClient } from "@/api/api";
import CustomButton from "@/components/Button";
import TextInput from "@/components/TextInput";
import { COLORS, SIZES } from "@/constants/theme";
import { AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (!newPassword || !confirmNewPassword) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    try {
      const response: AxiosResponse<string> = await apiClient.post(
        "/auth/reset-password",
        {
          token,
          newPassword,
        }
      );

      Alert.alert("Sucesso", response.data, [
        { text: "OK", onPress: () => router.replace("/login") },
      ]);
    } catch (error: any) {
      Alert.alert("Erro", error?.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redefinir Senha</Text>
      <Text style={styles.subtitle}>Insira sua nova senha abaixo.</Text>
      <TextInput
        placeholder="Nova senha"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirme a nova senha"
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        secureTextEntry
        style={{ marginTop: 10 }}
      />

      <CustomButton
        title="Redefinir Senha"
        isLoading={isLoading}
        onPress={handleReset}
        type="primary"
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: SIZES.padding * 2,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: SIZES.padding * 2,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center"
  },
});
