import React, { useState } from "react";
import { View, Text, Button, StyleSheet} from "react-native";
import { StatusBar } from "expo-status-bar";

const MainScreen = () => {
  const [message, setMessage] = useState("Bem-Vindo ao Expo!");

  const handlePress = () => {
    setMessage("Você clicou no botão!");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu App Expo</Text>
      <Text style={styles.message}>{message}</Text>
      <Button title="Clique aqui" onPress={handlePress} />
      <StatusBar style="auto" />
    </View>
  );
};

const AnotherScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Outra Tela</Text>
      <Text style={styles.message}>Esta é outra tela no aplicativo.</Text>

    </View>
  );
};

export default function App(){
  return <MainScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
});

