import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

const NativeAnimatedComponent = () => {
  const animation = useSharedValue(1);

  const handlePress = () => {
    animation.value = withSpring(animation.value === 1 ? 1.5 : 1);
  };
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, { transform: [{ scale: animation }] }]} />
      <Button title="Animação" onPress={handlePress} />
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Componente Nativo</Text>
      <NativeAnimatedComponent />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5f",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
    marginBottom: 20,
  },
});



