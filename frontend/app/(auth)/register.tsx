import { apiClient } from "@/api/api";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
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

export default function registerScreen() {
  //   const { register, isLoading } = useAuthStore();
  const isLoading = false;
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (password != confirmPassword) {
      Alert.alert("Erro", "Verifique se a senha que você escreveu são as mesmas.")
      return;
    }

    await apiClient
      .post<String>("/auth/register", {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      })
      .then((response: AxiosResponse<String>) => {
        Alert.alert("Sucesso", `${response.data}`, [
          { text: "OK", onPress: () => router.navigate("/login") },
        ])
      })
      .catch((error) => {
        if (error instanceof Error) {
          Alert.alert("Erro de Registro", error.message);
        }
      });
   
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {isLoading && <Spinner />}
          <Text style={styles.title}>Criar Conta</Text>
          <TextInput
            placeholder="Nome Completo"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <Button
            title="Registrar"
            onPress={handleRegister}
            isLoading={isLoading}
          />
          <TouchableOpacity
            onPress={() => router.navigate("/login")}
            style={styles.linkContainer}
          >
            <Text style={styles.linkText}>Já tem uma conta? Faça o login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
    color: COLORS.text,
    marginBottom: SIZES.padding * 2,
  },
  linkContainer: { marginTop: 15 },
  linkText: { color: COLORS.primary, fontSize: SIZES.body },
});
