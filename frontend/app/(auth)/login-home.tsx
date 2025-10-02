import CustomButton from "@/components/Button";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const WELCOME_ILLUSTRATION = require("@/assets/images/logo.png");

const LoginHomeScreen: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.navigate("/login");
  };

  const handleRegister = () => {
    router.navigate("/register");
  };

  return (
    <View style={styles.container}>
      <Image
        source={WELCOME_ILLUSTRATION}
        style={styles.illustrationImage}
        accessibilityLabel="Man sitting on a chair, working on a laptop, and holding a cup."
      />

      <View style={styles.contentArea}>
        <Text style={styles.mainTitle}>Titulo</Text>
        <Text style={styles.mainTitle}>Dois Titulo</Text>
        <Text style={styles.subtitle}>
          Subtitulo menorzinho pra dar um charme
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Login"
          onPress={handleLogin}
          type="primary"
          fullWidth={false}
          style={styles.loginButtonSpacing}
        />

        <CustomButton
          title="Register"
          onPress={handleRegister}
          type="secondary"
          fullWidth={false}
          style={styles.registerButtonSpacing}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    justifyContent: "center",
    alignItems: "center",
    gap: "5%",
  },

  illustrationImage: {
    width: "90%",
    height: "30%",
  },

  contentArea: {
    alignItems: "center",
    width: "75%",
  },

  mainTitle: {
    fontSize: 42,
    fontWeight: "700",
    textAlign: "center",
    color: "#2b847c",
    lineHeight: 38,
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    lineHeight: 20,
    marginTop: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    paddingHorizontal: 10,
    alignItems: "center",
  },

  loginButtonSpacing: {
    marginRight: 15,
  },
  registerButtonSpacing: {
    marginLeft: 15,
  },
});

export default LoginHomeScreen;
