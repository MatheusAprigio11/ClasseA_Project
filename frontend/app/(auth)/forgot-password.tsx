import { apiClient } from "@/api/api";
import CustomButton from "@/components/Button";
import TextInput from "@/components/TextInput";
import { COLORS, SIZES } from "@/constants/theme";
import { AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ForgotPasswordScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleRequest = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira seu email.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    setIsLoading(true);

    try {
      const response: AxiosResponse<string> = await apiClient.post(
        "/auth/forgot-password",
        { email }
      );

      Alert.alert("Sucesso", response.data, [
        { text: "OK", onPress: () => router.navigate("/login") },
      ]);
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error?.message || "Erro ao enviar email de recuperação."
      );
    } finally {
      setIsLoading(false);
    }
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

      <CustomButton
        title="Enviar Link"
        isLoading={isLoading}
        onPress={handleRequest}
        type="primary"
        disabled={isLoading}
        style={styles.sendButton}
      />
      
      <CustomButton
        title="Voltar para o Login"
        onPress={() => router.back()}
        type="secondary"
        style={styles.linkLoginButton}
      />
    </View>
  );
};

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

  sendButton: {
    marginBottom: 20,
  },

  linkLoginButton: {
    flex: 0,
    paddingHorizontal: 0,
    alignSelf: "center",
  },
});

export default ForgotPasswordScreen;
