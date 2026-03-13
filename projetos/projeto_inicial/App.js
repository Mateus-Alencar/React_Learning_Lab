// Importa o React e o Hook useState, que permite criar e controlar estados dentro do componente
import React, {useState} from 'react';

// Importa componentes básicos do React Native para construir a interface
import { Text, View, Button, StyleSheet } from 'react-native';

// Importa o componente StatusBar do Expo para controlar a aparência da barra de status do celular
import { StatusBar } from "expo-status-bar";


// Criação do componente funcional chamado MainScreen
const MainScreen = () => {

  // Cria um estado chamado "message"
  // message -> armazena o valor atual
  // setMessage -> função que altera o valor do estado
  // O valor inicial é "Bem-vindo ao Expo!"
  const [message, setMessage] = useState("Bem-vindo ao Expo!");

  // Função executada quando o botão é pressionado
  const handlePress = () => {

    // Atualiza o valor da variável de estado "message"
    // Isso faz o React renderizar novamente o componente com o novo valor
    setMessage("Você clicou no Botão!");
  }

  // Retorna a interface visual que será exibida na tela
  return (
    // View funciona como um container (semelhante a uma div no HTML)
    <View style={styles.container}>

      {/* Texto que representa o título do aplicativo */}
      <Text style={styles.tittle}>Meu App Expo</Text>

      {/* Exibe o valor atual da variável de estado "message" */}
      <Text style={styles.message}>{message}</Text>

      {/* Botão que chama a função handlePress quando pressionado */}
      <Button title="Clique aqui" onPress={handlePress} />

      {/* Controla o estilo da barra de status do celular */}
      <StatusBar style="auto" />

    </View>
  )
}

// Criação de outro componente chamado AnotherScreen
// Ele representa uma segunda tela do aplicativo
const AnotherScreen = () => {

  return (

    // Container principal da tela
    <View style={styles.container}>

      {/* Título da segunda tela */}
      <Text style={styles.tittle}>Outra Tela</Text>

      {/* Texto informativo da tela */}
      <Text style={styles.message}>Esta e outra tela no aplicativo.</Text>

    </View>
  )
}

// Componente principal da aplicação
// É o ponto de entrada do aplicativo
export default function App() {

  // Aqui estamos renderizando apenas a tela MainScreen
  return <MainScreen/>;

}

// Criação dos estilos utilizando StyleSheet do React Native
const styles = StyleSheet.create({

  // Estilo do container principal
  container: {
    flex: 1, // Faz o componente ocupar toda a tela
    justifyContent: "center", // Centraliza os elementos verticalmente
    alignItems: "center", // Centraliza os elementos horizontalmente
    backgroundColor: "#f5f5f5", // Cor de fundo da tela
  },

  // Estilo do título
  title: {
    fontSize: 24, // Tamanho da fonte
    fontWeight: "bold", // Fonte em negrito
    marginBottom: 20, // Espaço abaixo do título
  },

  // Estilo do texto de mensagem
  message: {
    fontSize: 16, // Tamanho da fonte
    marginBottom: 20, // Espaço abaixo do texto
  }
})