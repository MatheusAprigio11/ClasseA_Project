import { apiClient } from "@/api/api";
import CustomButton from "@/components/Button";
import TextInput from "@/components/TextInput";
import { COLORS, SIZES } from "@/constants/theme";
import { AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("A");
      const response: AxiosResponse<string> = await apiClient.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      Alert.alert("Sucesso", response.data, [
        { text: "OK", onPress: () => router.navigate("/login") },
      ]);
    } catch (error: any) {
      Alert.alert("Erro de Registro", error?.message || "Erro ao registrar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Crie uma conta para explorar nosso aplicativo!</Text>

          <TextInput
            placeholder="Nome Completo"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Senha"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TextInput
            placeholder="Confirmar Senha"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <CustomButton
            title="Registrar"
            isLoading={isLoading} 
            onPress={handleRegister}
            type="primary"
            disabled={isLoading}
            style={styles.createAccountButton}
          />

          <CustomButton 
            title="Já tem uma conta? Faça o login"
            onPress={() => router.navigate("/login")}
            type="secondary"
            style={styles.signInButton}
          />

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  scrollContainer: { flexGrow: 1, justifyContent: "center" },
  container: {
    justifyContent: "center",
    alignItems: "center",
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

  linkContainer: { marginTop: 15 },
  linkText: { color: COLORS.primary, fontSize: SIZES.body },

  createAccountButton: {
    marginBottom: 20,
  },

  signInButton: {
    flex: 0,
    paddingHorizontal: 0,
    alignSelf: "center",
  },
});

export default RegisterScreen;
