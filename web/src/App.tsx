import { useState } from 'react';

function App() {
  const url = 'http://localhost:3000/livro';
  const [livros, setLivros] = useState([]); //useState([]) é o valor inicial de livros, que é um array vazio []
  const [livrosCarregados, setLivrosCarregados] = useState(false); //useState(false) é o valor inicial de livrosCarregados, que é false [boolean]

  const listarLivros = async () => {
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setLivros(data);
        setLivrosCarregados(true);
      })
      .catch(error => { console.log(error.message) });
  }

  return (
    <div className="App">
      <button onClick={listarLivros}>Listar Livros</button>
      {livrosCarregados && livros.length === 0 && <p>Nenhum livro encontrado.</p>}
      {!livrosCarregados && <p>Para listar os livros clique no botão.</p>}
      {livrosCarregados && livros.length > 0 && (
        livros.map((livro: any) => (
          <div key={livro.id}>
            <h2>{livro.titulo}</h2>
            <strong>Autor:</strong> {livro.nomeAutor}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
