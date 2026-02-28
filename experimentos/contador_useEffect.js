// Importando do React os dois Hooks: useState (controla o estado), useEffect (executa efeitos depois da renderização)
import React, { useState, useEffect } from "react";

// Criando um componente chamado: Contador
function Contador() {

  // useState(0): cria uma variável de estados que começa com 0 e retorna o ValorAtual e a funcaoQueAtualiza
  // contador = valorAtual; setContador = função que altera o valor; 0 = Valor Inicial
  const [contador, setContador] = useState(0);

  // useEffect = executa o código após o componente renderizar
  useEffect(() => {
    console.log("O contador foi atualizado:", contador);
    document.title = `Contador: ${contador}`;

    return () => {
      console.log("Limpando efeito anterior...");
    };
  }, [contador]);

  return (
    <div>
      <h1>Contador: {contador}</h1>
      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
      <button onClick={() => setContador(contador - 1)}>
        Decrementar
      </button>
    </div>
  );
}

export default Contador;