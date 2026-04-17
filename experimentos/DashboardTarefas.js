import React, { useState } from 'react';
// Importa componentes básicos do React Native
import { View, Text, TextInput, Button, StyleSheet, FlatList, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// Importa navegação entre telas
import { createStackNavigator } from '@react-navigation/stack';
// Importa gráfico de barras
import { BarChart } from 'react-native-chart-kit';
// Cria o navegador de pilha (Stack)
const Stack = createStackNavigator();

// Tela inicial (Landing)
function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo ao App</Text>

      <Button title="Ir para tarefas" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

// Tela principal
function HomeScreen({ navigation }) {
  // Estados para armazenar dados
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');

  // Cria objeto da nova tarefa
  function adicionarTarefa() {
    if (!titulo || !categoria) return;

    const novaTarefa = {
      id: Date.now().toString(),
      titulo,
      descricao,
      categoria,
    };
   // Atualiza lista adicionando nova tarefa
    setTarefas(prev => [...prev, novaTarefa]);
    // Limpa os campos
    setTitulo('');
    setDescricao('');
    setCategoria('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Tarefas</Text>

      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />

      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />

      <TextInput
        placeholder="Categoria (ex: estudo, trabalho...)"
        value={categoria}
        onChangeText={setCategoria}
        style={styles.input}
      />

      <Button title="Adicionar" onPress={adicionarTarefa} />

      <Button
        title="Ver gráfico"
        onPress={() => navigation.navigate('Stats', { tarefas })}
      />

      <FlatList
        style={{ width: '100%', marginTop: 20 }}
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitulo}>{item.titulo}</Text>
            <Text>{item.descricao}</Text>
            <Text style={{ color: 'gray' }}>Categoria: {item.categoria}</Text>
          </View>
        )}
      />
    </View>
  );
}

// Tela 2 - Gráfico
function StatsScreen({ route }) {
  // Recebe as tarefas da tela anterior
  const { tarefas } = route.params;
  // Função que agrupa tarefas por categoria
  const agrupar = (lista) => {
    const resultado = {};

    // Se já existe categoria, soma +1
    // Se não existe, começa com 1
    lista.forEach(item => {
      resultado[item.categoria] = (resultado[item.categoria] || 0) + 1;
    });

    return resultado;
  };
  // Gera dados agrupados
  const dados = agrupar(tarefas);

  const labels = Object.keys(dados);
  const values = Object.values(dados);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gráfico por Categoria</Text>

      {labels.length > 0 ? (
        <BarChart
          data={{
            labels: labels,
            datasets: [{ data: values }]
          }}
          width={Dimensions.get('window').width - 20}
          height={220}
          fromZero
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: () => '#ff6600',
            labelColor: () => '#000',
          }}
        />
      ) : (
        <Text>Nenhuma tarefa adicionada</Text>
      )}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Stats" component={StatsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemTitulo: {
    fontWeight: 'bold',
  },
});
