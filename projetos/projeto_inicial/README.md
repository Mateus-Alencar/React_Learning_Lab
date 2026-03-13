# Projeto de Estudos React Native

Este projeto é um exemplo simples desenvolvido com React Native utilizando Expo, criado com o objetivo de praticar conceitos fundamentais do React.

## Estrutura do código

- MainScreen → Tela principal do aplicativo
- App → Componente principal que renderiza a aplicação
- StyleSheet → Definição dos estilos da interface

## Conceitos

- Componentes (View, Text)
- Hook `useState`: O useState permite criar e controlar estados dentro de um componente.
  - No projeto, ele é utilizado para armazenar e atualizar uma mensagem exibida na tela.
  ```javascript
  const [message, setMessage] = useState("Bem-vindo ao Expo!");
  ```

- Manipulação de Eventos: O botão executa uma função quando pressionado.
  ```javascript
  <Button title="Clique aqui" onPress={handlePress} />
  // Essa função altera o estado da mensagem:
  const handlePress = () => {
  setMessage("Você clicou no Botão!");
  }
  ```  
- Interface do aplicativo:  
  - View → Container (similar a uma div no HTML)  
  - Text → Exibição de texto  
  - Button → Botão interativo  
  - StatusBar → Controle da barra de status do dispositivo  