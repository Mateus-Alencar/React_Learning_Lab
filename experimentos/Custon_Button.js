import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";


const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};


const CustomCard = ({ title, description }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
};

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Componentes Personalizados</Text>
      <CustomCard title="Meu Card" description="Este é um card reutilizável." />
      <CustomButton title="Clique Aqui" onPress={() => alert("Botão pressionado!")} />
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return <MainScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "red",
    padding: 25,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    width: "80%",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
});




