import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppTextInput from "@/components/TextInput";
import CustomButton from "@/components/Button";
import { COLORS, SIZES } from "@/constants/theme";
import { useAuthStore } from "@/store/authStore";
import { apiClient } from "@/api/api";

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

export default function CreateOrEditProductScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const id = (route as any).params?.id;

  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(false);

  const token = useAuthStore((s) => s.token);

  const isEdit = Boolean(id);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!form.description.trim()) newErrors.description = "Descrição é obrigatória";

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
    setForm((prev) => ({ ...prev, price: text.replace(/[^0-9.,]/g, "") }));
  };

  const loadProduct = useCallback(async () => {
    if (!isEdit) {
      setForm({
        name: "",
        description: "",
        price: ""
      });
      return; 
    }
    if (!token) {
      return;
    }

    try {
      setLoadingInitial(true);
      const res = await apiClient.get(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;

      setForm({
        name: data.name ?? "",
        description: data.description ?? "",
        price:
          typeof data.price === "number"
            ? (Math.round(data.price * 100) / 100)
                .toFixed(2)
                .replace(".", ",")
            : (data.price ?? "").toString(),
      });
    } catch (err: any) {
      console.error("Failed to load product:", err?.response || err);
      Alert.alert("Erro", "Não foi possível carregar os dados do produto.");
    } finally {
      setLoadingInitial(false);
    }
  }, [id, isEdit, token]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const createProduct = async () => {
    const body = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price.replace(",", ".")),
    };

    const res = await apiClient.post("/products", body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  };

  const updateProduct = async (productId: string | number) => {
    const body = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price.replace(",", ".")),
    };

    const res = await apiClient.put(`/products/${productId}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (!token) {
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        await updateProduct(id);
        Alert.alert("Sucesso", "Produto atualizado com sucesso!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        await createProduct();
        Alert.alert("Sucesso", "Produto cadastrado com sucesso!", [
          {
            text: "OK",
            onPress: () =>
              setForm({
                name: "",
                description: "",
                price: "",
              }),
          },
        ]);
      }
    } catch (err: any) {
      console.error("Submit error:", err?.response || err);
      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Ocorreu um erro ao salvar o produto.";
      Alert.alert("Erro", message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingInitial) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>{isEdit ? "Editar Produto" : "Nova Caipirinha"}</Text>
          <Text style={styles.subtitle}>
            {isEdit ? "Atualize os dados do produto" : "Cadastre uma nova caipirinha no cardápio"}
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome *</Text>
          <AppTextInput
            placeholder="Ex: Caipirinha de Limão"
            value={form.name}
            onChangeText={(text) => setForm((p) => ({ ...p, name: text }))}
            error={errors.name}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Descrição *</Text>
          <AppTextInput
            placeholder="Ex: Caipirinha tradicional feita com limão fresco"
            value={form.description}
            onChangeText={(text) => setForm((p) => ({ ...p, description: text }))}
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
            title={isEdit ? "Salvar Alterações" : "Cadastrar Caipirinha"}
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
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  scrollContent: { flexGrow: 1, padding: SIZES.padding },
  header: { marginBottom: 24 },
  title: { fontSize: 28, fontWeight: "700", color: COLORS.text, marginBottom: 8 },
  subtitle: { fontSize: 16, color: COLORS.textLight },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: { fontSize: 16, fontWeight: "600", color: COLORS.text, marginBottom: 8 },
  textArea: { height: 100, textAlignVertical: "top", paddingTop: 12 },
  button: { marginTop: 8 },
});
