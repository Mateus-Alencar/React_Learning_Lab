function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

// Criando o componente padrão chamado MyApp
export default function MyApp() {
  // <MyButton> -> Componente React sendo chamado como se fosse uma tag HTML
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}