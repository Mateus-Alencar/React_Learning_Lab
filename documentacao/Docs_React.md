# React Native
O React Native é um framework criado pela Meta que permite desenvolver aplicativos mobile (Android e iOS) usando JavaScript e React.

## Conceitos fundamentais javascript

- `let` e `const`
    - `let`:
      - Permite retribuição
      -  Pertence ao escopo de bloco (`{}`)
          ```javascript
          let idade = 20;
          idade = 21; // permitido

          if (true) {
            let nome = "Mateus";
          }
          // console.log(nome); // ❌ erro (escopo de bloco)
          ```
    - `const`: 
      - Não permite reatribuição
      - Também tem escopo de bloco
      - Deve ser inicializada na declaração
        ```javascript
        const PI = 3.14;
        // PI = 3.1415; ❌ erro
        ```
        >[!WARNING]
        > objetos e arrays declarados com const podem ter seus valores internos alterados:
          ```javascript
          const pessoa = { nome: "Ana" };
          pessoa.nome = "Carlos"; // ✅ permitido
          ```
- Arrow functions
  - Forma mais curta de escrever funções.
    - Forma normal: 
      ```javascript
      function soma(a, b) {
      return a + b;
      }
      ```
    - Utilizando arrow function:
      ```javascript
      const soma = (a, b) => {
      return a + b;
      };
      ```
    - Forma reduzida:
      ```javascript
      const soma = (a, b) => a + b;
      ```
- Destructuring
  - Permite extrair valores de objetos ou arrays facilmente.
    - Array:
      ```javascript
      const numeros = [10, 20, 30];
      const [a, b] = numeros;

      console.log(a); // 10
      console.log(b); // 20
      ```
    - Objeto:
      ```javascript
      const usuario = {
        nome: "Mateus",
        idade: 21
      };
      const { nome, idade } = usuario;
      console.log(nome); // Mateus
      ```
- Spread operator (`...`)
  - É um recurso do JavaScript que permite "desempacotar" ou "espalhar" elementos de arrays, objetos ou strings em elementos individuais
    ```javascript
    const frutas = ['maçã', 'banana'];
    const todasFrutas = [...frutas, 'pera', 'uva']; // Resultado: ['maçã', 'banana', 'pera', 'uva']
    ```
- Promises
  - É um objeto que representa o sucesso ou a falha eventual de uma operação assíncrona (tarefa executada em segundo plano).
  - Uma Promise pode estar:
    - pending (pendente)
    - fulfilled (resolvida)
    - rejected (rejeitada)
  - Para lidar com o resultado, é usado os seguintes métodos:
    - `.then()`: Executa uma função quando a Promise é resolvida com sucesso.
    - `.catch()`: Executa uma função caso ocorra algum erro (rejeição).
    - `.finally()`: Executa um código independente do resultado (sucesso ou erro)
      ```javascript
      // 1. Criando a Promise
      const buscarDados = new Promise((resolve, reject) => {
        const sucesso = true; // Simula se a operação deu certo

        setTimeout(() => {
          if (sucesso) {
            resolve("Dados carregados com sucesso! ✅"); // Estado: Fulfilled
          } else {
            reject("Erro ao carregar dados. ❌"); // Estado: Rejected
          }
        }, 2000);
      });

      // 2. Consumindo a Promise
      buscarDados
        .then((resultado) => {
          console.log(resultado); // Executa se houver resolve
        })
        .catch((erro) => {
          console.error(erro); // Executa se houver reject
        })
        .finally(() => {
          console.log("Operação finalizada."); // Executa sempre
        });
      ```
- Async/Await
  - Forma mais moderna e limpa de trabalhar com Promises.
    ```javascript
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data));
    ```
- ES Modules
  - Permite dividir código em arquivos.
    - Exportando (arquivo `math.js`):
      ```javascript
      export function soma(a, b) {
        return a + b;
      }
      ```
      ```javascript
      export const PI = 3.14;
      ```
    - Importando
      ```javascript
        import { soma, PI } from "./math.js";
        console.log(soma(2, 3));
      ```
      ou
      ```javascript
        import multiplicar from "./math.js";
      ```
## Principais conceitos do React

- Componentes
  - Eles permitem dividir a interface em partes independentes, reutilizáveis e isoladas.
    - Componentes de função: São funções javascript que retornam HTML (JSX).
    - Exemplo:
        ```javascript
        function Saudacao() {
          return <h1>Olá, Mundo!</h1>;
        }
        ```
- Props
  - As Props são a forma como os componentes se comunicam. Elas funcionam como argumentos de uma função, passando dados de um componente pai para um componente filho.
    - **Imutabilidade**: As props são somente leitura. O componente que as recebe não pode alterá-las.
    - **Fluxo Unidirecional**: Os dados descem na árvore de componentes.
- State
  - Se as props são configurações que o componente recebe, o State é a "memória" interna do componente.
    - **Interatividade**: Quando o estado muda, o React reage e atualiza o componente na tela automaticamente.
    - **Privacidade**: O estado é local e totalmente controlado pelo componente.
- Hooks (useState e useEffect)
  - Hooks são funções que permitem "conectar" recursos do React em componentes de função.
    - `useSate`: É o Hook que permite adicionar estado ao componente.
    - `useEffect`: Permite executar efeitos colaterais (side effects) em componentes, como chamadas a APIs, assinaturas ou mudanças manuais no DOM.
      >[!NOTE]
      > O DOM (Document Object Model, ou Modelo de Objeto de Documento) é uma interface de programação que o navegador cria assim que carrega uma página web.
- Renderização condicional
  - No React, você pode renderizar diferentes elementos ou componentes dependendo de certas condições, usando lógica JavaScript padrão
  - Exemplo: Exibir um botão de "Login" se o usuário estiver deslogado, ou "Perfil" se estiver logado.
      ```javascript
      {estaLogado ? <BotaoPerfil /> : <BotaoLogin />}
      ```