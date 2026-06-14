import "./App.css";
import BuscadorCep from "./components/BuscadorCep";
import GithubCard from "./components/GithubCard";

export default function App() {
  return (
    <main className="app-shell">
      <div className="app-container">
        <header className="hero">
          <span className="eyebrow">Roteiro 12</span>
          <h1>Mergulhando na Rede</h1>
          <p>
            Nossa aplicacao agora consome dados do mundo real. O foco desta aula
            e observar como a interface reage aos estados de carregamento, erro
            e sucesso.
          </p>
        </header>

        <div className="grid">
          <BuscadorCep />
          <GithubCard />
        </div>
      </div>
    </main>
  );
}