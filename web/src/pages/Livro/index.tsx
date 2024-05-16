import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Livro() {
  const { id } = useParams();
  const [livro, setLivro] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const detalheLivro = async () => {
      try {
        const response = await fetch(`http://localhost:3000/livro/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLivro(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Ocorreu um erro ao buscar o livro.');
        }
      } finally {
        setLoading(false);
      }
    };

    detalheLivro();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1>Detalhe do Livro</h1>
      {livro ? (
        <div>
          <h2>{livro.titulo}</h2>
          <p>{livro.resumo}</p>
          <p><strong>ISBN:</strong>{livro.ISBN}</p>
          <p><strong>Author:</strong> {livro.autor.nome}</p>
          <p><strong>Price:</strong> ${livro.preco}</p>
        </div>
      ) : (
        <p>Livro não encontrado.</p>
      )}
      <button
        onClick={() => {
          navigate(-1);
        }}
      >{'< Voltar'}</button>
    </div>
  );
}