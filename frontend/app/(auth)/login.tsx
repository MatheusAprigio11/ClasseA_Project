import { apiClient } from "@/api/api";
import AppButton from "@/components/Button";
import Spinner from "@/components/Spinner";
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

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    await apiClient
      .post<LoginResponse>("/auth/login", {
        email: email,
        password: password
      })
      .then((response: AxiosResponse<LoginResponse>) => {
        login(response.data.token || "");
      })
      .catch((error) => {
        Alert.alert("Erro de Login", error.message);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex}
    >
      <View style={styles.container}>
        {isLoading && <Spinner />}
        <Text style={styles.title}>Login</Text>
        <AppTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <AppTextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <AppButton title="Entrar" onPress={handleLogin} isLoading={isLoading} />
        <TouchableOpacity
          onPress={() => router.navigate("/register")}
          style={styles.linkContainer}
        >
          <Text style={styles.linkText}>Não tem uma conta? Registre-se</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.navigate("/forgot-password")}
          style={styles.linkContainerSecondary}
        >
          <Text style={styles.linkTextSecondary}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

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
    color: COLORS.text,
    marginBottom: SIZES.padding * 2,
  },
  linkContainer: { marginTop: 15 },
  linkText: { color: COLORS.primary, fontSize: SIZES.body },
  linkContainerSecondary: { marginTop: 10 },
  linkTextSecondary: { color: COLORS.textLight, fontSize: SIZES.font },
});
