import { useState } from "react";

export default function FormularioRecado({ aoPublicar }) {
  const [autor, setAutor] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState("");

  async function handleSubmit(evento) {
    evento.preventDefault();

    if (!autor.trim() || !mensagem.trim()) {
      setErroEnvio("Preencha seu nome e a mensagem.");
      return;
    }

    setEnviando(true);
    setErroEnvio("");

    try {
      await aoPublicar(autor, mensagem);

      setAutor("");
      setMensagem("");
    } catch (erro) {
      setErroEnvio("Não foi possível publicar o recado.");
      console.error(erro);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form
      className="formulario-recado"
      onSubmit={handleSubmit}
    >
      <h2>Deixe seu recado</h2>

      <div className="campo">
        <label htmlFor="autor">
          Seu nome:
        </label>

        <input
          id="autor"
          type="text"
          value={autor}
          placeholder="Ex: Maria"
          disabled={enviando}
          onChange={(evento) =>
            setAutor(evento.target.value)
          }
        />
      </div>

      <div className="campo">
        <label htmlFor="mensagem">
          Mensagem:
        </label>

        <textarea
          id="mensagem"
          rows="3"
          value={mensagem}
          placeholder="O que você quer compartilhar com a turma?"
          disabled={enviando}
          onChange={(evento) =>
            setMensagem(evento.target.value)
          }
        />
      </div>

      <button
        type="submit"
        disabled={enviando}
      >
        {enviando
          ? "Publicando..."
          : "Publicar Recado"}
      </button>

      {erroEnvio && (
        <p className="erro" role="alert">
          {erroEnvio}
        </p>
      )}
    </form>
  );
}