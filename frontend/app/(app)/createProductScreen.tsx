import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AppTextInput from "@/components/TextInput";
import CustomButton from "@/components/Button";
import { COLORS, SIZES } from "@/constants/theme";

interface ProductForm {
  name: string;
  description: string;
  price: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
}

export default function CreateProductScreen() {
  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!form.description.trim()) {
      newErrors.description = "Descrição é obrigatória";
    }

    if (!form.price.trim()) {
      newErrors.price = "Preço é obrigatório";
    } else {
      const priceValue = parseFloat(form.price.replace(",", "."));
      if (isNaN(priceValue) || priceValue <= 0) {
        newErrors.price = "Preço deve ser maior que zero";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePriceChange = (text: string) => {
    // Permite apenas números, vírgula e ponto
    const cleaned = text.replace(/[^0-9.,]/g, "");
    setForm({ ...form, price: cleaned });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simula uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const productData = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price.replace(",", ".")),
      };

      console.log("Produto criado:", productData);

      Alert.alert(
        "Sucesso!",
        "Caipirinha cadastrada com sucesso!",
        [
          {
            text: "OK",
            onPress: () => {
              // Limpa o formulário
              setForm({ name: "", description: "", price: "" });
              setErrors({});
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar a caipirinha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Nova Caipirinha</Text>
          <Text style={styles.subtitle}>
            Cadastre uma nova caipirinha no cardápio
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome *</Text>
          <AppTextInput
            placeholder="Ex: Caipirinha de Limão"
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
            error={errors.name}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Descrição *</Text>
          <AppTextInput
            placeholder="Ex: Caipirinha tradicional feita com limão fresco"
            value={form.description}
            onChangeText={(text) => setForm({ ...form, description: text })}
            error={errors.description}
            multiline
            numberOfLines={4}
            inputStyle={styles.textArea}
            autoCapitalize="sentences"
          />

          <Text style={styles.label}>Preço (R$) *</Text>
          <AppTextInput
            placeholder="Ex: 15,00"
            value={form.price}
            onChangeText={handlePriceChange}
            error={errors.price}
            keyboardType="decimal-pad"
          />

          <CustomButton
            title="Cadastrar Caipirinha"
            onPress={handleSubmit}
            isLoading={loading}
            type="primary"
            style={styles.button}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    flexGrow: 1,
    padding: SIZES.padding,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  button: {
    marginTop: 8,
  },
});