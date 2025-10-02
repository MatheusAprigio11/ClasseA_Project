import { apiClient } from "@/api/api";
import CustomButton from "@/components/Button";
import AppTextInput from "@/components/TextInput";
import { COLORS, SIZES } from "@/constants/theme";
import { useAuthStore } from "@/store/authStore";
import { LoginResponse } from "@/types/auth";
import { AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    setLoading(true);
    try {
      const response: AxiosResponse<LoginResponse> = await apiClient.post(
        "/auth/login",
        {
          email,
          password,
        }
      );
      login(response.data.token || "");
    } catch (error: any) {
      Alert.alert("Erro de Login", error?.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Entre aqui</Text>
        <Text style={styles.subtitle}>
          Bem vindo de volta! Sentimos sua falta!
        </Text>

        <AppTextInput
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <AppTextInput
          placeholder="Senha"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={() => router.navigate("/forgot-password")}
          style={styles.forgotPasswordContainer}
        >
          <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <CustomButton
          title="Entrar"
          isLoading={isLoading}
          onPress={handleLogin}
          type="primary"
          disabled={isLoading}
          style={styles.signInButton}
        />

        <CustomButton
          title="Criar uma conta"
          onPress={() => router.navigate("/register")}
          type="secondary"
          style={styles.createAccountButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
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
  },

  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },

  signInButton: {
    marginBottom: 20,
  },

  createAccountButton: {
    flex: 0,
    paddingHorizontal: 0,
    alignSelf: "center",
  },
});

export default LoginScreen;
