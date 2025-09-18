import { apiClient } from "@/api/api";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { COLORS, SIZES } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AxiosResponse } from "axios";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  // const { forgotPassword, isLoading } = useAuthStore();
  const isLoading = false;
  const [email, setEmail] = useState("");

  const handleRequest = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira seu email.");
      return;
    }

    await apiClient
      .post<String>("/auth/forgot-password", {
        email: email
      })
      .then((response: AxiosResponse<String>) => {
        Alert.alert("Sucesso", `${response.data}`, [
          { text: "OK", onPress: () => router.navigate("/login") },
        ]);
      })
      .catch((error) => {
        if (error instanceof Error) {
          Alert.alert("Erro de Registro", error.message);
        }
      });

    Alert.alert(
      "Verifique seu Email",
      "Se um usuário com este email existir, um link de recuperação foi enviado.",
      [{ text: "OK", onPress: () => router.navigate("/login") }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.subtitle}>
        Insira seu email e enviaremos um link para você redefinir sua senha.
      </Text>
      <TextInput
        placeholder="Seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button
        title="Enviar Link"
        onPress={handleRequest}
        isLoading={isLoading}
      />
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>Voltar para o Login</Text>
      </TouchableOpacity>
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
  linkContainer: { marginTop: 15 },
  linkText: { color: COLORS.primary, fontSize: SIZES.body },
});
