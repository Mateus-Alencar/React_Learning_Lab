import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Animated } from 'react-native';

// O Item irá receber os seguintes parâmetros:
// text: Texto da tarefa
// done: Se está concluída (true/false)
// onToggle: Função para marcar/desmarcar
// onRemove: Função para deletar
const Item = ({ text, done, onToggle, onRemove }) => {

  // scaleAnim controla o "zoom" (escala) do item
  // começa com valor 1 (tamanho normal)
  const scaleAnim = useState(new Animated.Value(1))[0];

  // opacityAnim controla a transparência do item
  // começa com valor 1 (totalmente visível)
  const opacityAnim = useState(new Animated.Value(1))[0];

  // Função chamada ao clicar para concluir/desmarcar a tarefa
  const handleToggle = () => {

    // Executa uma sequência de animações
    Animated.sequence([

      // PRIMEIRA PARTE: animações acontecendo ao mesmo tempo
      Animated.parallel([

        // Aumenta levemente o tamanho do item (efeito de destaque)
        Animated.timing(scaleAnim, {
          toValue: 1.1,        // cresce para 110% do tamanho
          duration: 150,       // duração da animação em milissegundos
          useNativeDriver: true, // usa driver nativo (mais performático)
        }),

        // Diminui a opacidade (fica mais transparente)
        Animated.timing(opacityAnim, {
          toValue: 0.5,        // 50% visível
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      // SEGUNDA PARTE: volta ao estado original
      Animated.parallel([
        // Retorna ao tamanho normal
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        // Retorna à opacidade normal
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ])
    // Inicia a animação
    .start();

    // Alterna o estado da tarefa (concluída / não concluída)
    onToggle();
  };
  return (
    // Animated.View permite aplicar animações no container
    <Animated.View
      style={[
        styles.item,
        {
          // Aplica transformação de escala (zoom)
          transform: [{ scale: scaleAnim }],
          // Aplica a opacidade animada
          opacity: opacityAnim,
        },
      ]}
    >

      {/* Área clicável do texto */}
      <TouchableOpacity onPress={handleToggle} style={styles.textContainer}>
        
        {/* Texto da tarefa */}
        {/* Se estiver concluída, aplica estilo de "riscado" */}
        <Text style={[styles.text, done && styles.doneText]}>
          
          {/* Se done = true, adiciona um check antes do texto */}
          {done ? "✔️ " : ""}{text}
        </Text>
      </TouchableOpacity>

      {/* Botões de ação */}
      <View style={styles.buttons}>

        {/* Botão para concluir/desmarcar tarefa */}
        <Button title="✔️" onPress={handleToggle} />

        {/* Botão para remover tarefa */}
        <Button title="❌" onPress={onRemove} />
      </View>
    </Animated.View>
  );
};

// Lista
// Recebe três props:
// items → array de objetos de tarefas {id, text, done}
// onToggleItem → função para alternar o estado concluído de uma tarefa
// onRemoveItem → função para remover uma tarefa da lista
const ItemList = ({ items, onToggleItem, onRemoveItem }) => (
    // FlatList é um componente nativo do React Native para listas grandes
  <FlatList
    // Array de dados que será renderizado
    data={items}
    keyExtractor={(item) => item.id}
    // Recebe um objeto com a propriedade 'item' (cada objeto do array items)
    renderItem={({ item }) => (
      <Item
        text={item.text} // Passa o texto da tarefa
        done={item.done} // Passa se a tarefa está concluída
        // Cria uma função que chama onToggleItem com o id correto
        onToggle={() => onToggleItem(item.id)}
        // Cria uma função que chama onRemoveItem com o id correto
        onRemove={() => onRemoveItem(item.id)}
      />
    )}
  />
);

// Input
// onAddItem → função passada pelo App para adicionar uma nova tarefa à lista
const InputForm = ({ onAddItem }) => {
  // text → valor atual do input
  // setText → função para atualizar o valor do input
  const [text, setText] = useState('');

  // Função que é chamada quando o usuário pressiona o botão "Adicionar"
  const handleAdd = () => {
    if (text.trim()) {
      // Chama a função onAddItem do App, passando o texto digitado
      onAddItem(text);
      // Limpa o input, reiniciando o estado para uma string vazia
      setText('');
    }
  };
// Retorna o que será renderizado
  return (
    <View style={styles.inputContainer}>
      {/* Campo de texto para digitar a nova tarefa */}
      <TextInput
        style={styles.input} // Aplica estilo definido no StyleSheet
        placeholder="Digite uma tarefa" // Texto que aparece quando está vazio
        value={text} // Valor controlado pelo estado 'text'
        onChangeText={setText} // Atualiza o estado quando o usuário digita
      />
      {/* Quando clicado, chama a função handleAdd */}
      <Button title="Adicionar" onPress={handleAdd} />
    </View>
  );
};

// App principal
// Ele gerencia o estado global da lista de tarefas e os filtros
export default function App() {
  // items → array de objetos {id, text, done}
  // setItems → função para atualizar a lista
  const [items, setItems] = useState([]);

  // filter → 'all' | 'done' | 'pending'
  // setFilter → função para atualizar o filtro
  const [filter, setFilter] = useState('all');

  const addItem = (text) => {
    // Cria um novo objeto representando a tarefa
    const newItem = {
      id: Date.now().toString(), // id único baseado no timestamp
      text, // texto digitado pelo usuário
      done: false,// começa como não concluída
    };
 
    setItems([...items, newItem]);
  };

  // Função para alternar o estado de conclusão de uma tarefa
  const toggleItem = (id) => {
    // Percorre todos os itens e verifica qual tem o id igual ao passado
    const updated = items.map((item) =>
      // Se for o item clicado, cria uma cópia invertendo o valor de done
      item.id === id ? { ...item, done: !item.done } : item
    );
    // Atualiza a lista
    setItems(updated);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Cria uma lista filtrada com base no estado 'filter'
  const filteredItems = items.filter((item) => {
    if (filter === 'done') return item.done;
    if (filter === 'pending') return !item.done;
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>

      <InputForm onAddItem={addItem} />

      {/* BOTÕES DE FILTRO NO LUGAR CERTO */}
      <View style={styles.filterContainer}>
        <Button title="Todas" onPress={() => setFilter('all')} />
        <Button title="Pendentes" onPress={() => setFilter('pending')} />
        <Button title="Concluídas" onPress={() => setFilter('done')} />
      </View>

      {/* USA LISTA FILTRADA */}
      <ItemList
        items={filteredItems}
        onToggleItem={toggleItem}
        onRemoveItem={removeItem}
      />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  buttons: {
    flexDirection: 'row',
    gap: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
