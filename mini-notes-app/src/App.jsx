import { useEffect, useState } from "react";
import "./App.css";

const NOTES_STORAGE_KEY = "@mini-notes:notas_v1";

export default function App() {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [busca, setBusca] = useState("");
  const [notas, setNotas] = useState(() => {
    const dadosSalvos = localStorage.getItem(NOTES_STORAGE_KEY);

    if (dadosSalvos === null) {
      return [];
    }

    try {
      const notasSalvas = JSON.parse(dadosSalvos);

      if (Array.isArray(notasSalvas)) {
        return notasSalvas;
      }

      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notas));
  }, [notas]);

  function salvarNota(event) {
    event.preventDefault();

    const tituloLimpo = titulo.trim();
    const conteudoLimpo = conteudo.trim();

    if (tituloLimpo === "" || conteudoLimpo === "") {
      return;
    }

    const novaNota = {
      id: Date.now(),
      titulo: tituloLimpo,
      conteudo: conteudoLimpo,
      criadaEm: new Date().toISOString(),
    };

    setNotas((notasAtuais) => [novaNota, ...notasAtuais]);
    setTitulo("");
    setConteudo("");
  }

  function removerNota(idNota) {
    setNotas((notasAtuais) => notasAtuais.filter((nota) => nota.id !== idNota));
  }

  const notasFiltradas = notas.filter((nota) => {
    const termo = busca.toLowerCase();

    return (
      nota.titulo.toLowerCase().includes(termo) ||
      nota.conteudo.toLowerCase().includes(termo)
    );
  });

  return (
    <main className="app-shell">
      <header className="app-header">
        <span className="eyebrow">React Notes</span>
        <h1 className="title">Mini Notes App</h1>
        <p className="subtitle">
          Registre pequenas ideias, lembretes e observações da aula em uma
          interface controlada por estado.
        </p>
      </header>

      <section className="workspace">
        <form className="panel note-form" onSubmit={salvarNota}>
          <div className="field">
            <label htmlFor="titulo">Título</label>
            <input
              className="input"
              id="titulo"
              placeholder="Ex.: Revisar useEffect"
              type="text"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="conteudo">Anotação</label>
            <textarea
              className="textarea"
              id="conteudo"
              placeholder="Escreva uma observação curta..."
              value={conteudo}
              onChange={(event) => setConteudo(event.target.value)}
            />
          </div>

          <button
            className="save-btn"
            type="submit"
            disabled={titulo.trim() === "" || conteudo.trim() === ""}
          >
            Salvar anotação
          </button>
        </form>

        <section className="panel notes-panel">
          <div className="toolbar">
            <div>
              <h2 className="toolbar-title">Minhas anotações</h2>
              <span className="counter">
                {notas.length} anotaç{notas.length === 1 ? "ão" : "ões"} salva
                {notas.length === 1 ? "" : "s"}
              </span>
            </div>
{/* ### Desafio 1: botão "Apagar tudo" */}
              {notas.length > 0 && ( 
                <button className="clear-btn" 
                type="button" 
                onClick={ () => setNotas([])} 
                >Apagar todas as notas</button>
                     
              )}
{/* ###### */}
          </div>

          <div className="search-row">
            <input
              className="input"
              type="text"
              placeholder="Buscar nas anotações..."
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />

            {busca !== "" && (
              <button
                className="clear-btn"
                type="button"
                onClick={() => setBusca("")}
              >
                Limpar busca
              </button>
            )}
          </div>

          {notas.length === 0 ? (
            <p className="empty-state">
              Nenhuma anotação ainda. Use o formulário ao lado para criar a
              primeira.
            </p>
          ) : notasFiltradas.length === 0 ? (
            <p className="empty-state">
              Nenhuma anotação encontrada para "{busca}".
            </p>
          ) : (
            <div className="notes-list">
              {notasFiltradas.map((nota) => (
                <article className="note-card" key={nota.id}>
                  <div className="note-card-header">
                    <div>
                      <h3 className="note-title">{nota.titulo}</h3>
                      <span className="note-date">
                        {new Date(nota.criadaEm).toLocaleString("pt-BR")}
                      </span>
                    </div>

                    <button
                      className="delete-btn"
                      type="button"
                      onClick={() => removerNota(nota.id)}
                    >
                      Excluir
                    </button>
                  </div>

                  <p className="note-content">{nota.conteudo}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
