import { apiClient } from "@/api/api";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { COLORS, SIZES } from "@/constants/theme";
import { AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const params = useSearchParams(); // pega ?token=XYZ
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    try {
      const response: AxiosResponse<string> = await apiClient.post(
        "/auth/reset-password",
        {
          token: token,
          newPassword: password,
          confirmNewPassword: confirmPassword
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
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirme a nova senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{ marginTop: 10 }}
      />
      <Button
        title="Redefinir Senha"
        onPress={handleReset}
        isLoading={isLoading}
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
    fontSize: SIZES.h2,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SIZES.padding,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textLight,
    textAlign: "center",
    marginBottom: SIZES.padding * 2,
  },
});
