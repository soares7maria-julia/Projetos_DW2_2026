import { useState } from "react";

function GithubCard() {

  const [username, setUsername] = useState(""); // Adicionado
  const [loading, setLoading] = useState(false); // Começa false porque a busca só acontece ao clicar no botão
  const [erro, setErro] = useState(null);
  const [perfil, setPerfil] = useState(null);

 // Adicionado
  async function buscarPerfil() {

    if (!username.trim()) {
      setErro("Digite um nome de usuário.");
      return;
    }

    setLoading(true);
    setErro(null);

    setPerfil(null);
  
  try {

      const resposta = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!resposta.ok) {
        throw new Error("Usuário não encontrado.");
      }

      const dados = await resposta.json();

      setPerfil(dados);

    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }
//////////


  return (
    <section className="card">
      <h2>Card do GitHub</h2>

      {/* adicionado */}
       <div className="search-row">

        {/* adicionado */}
        <input
          type="text"
          placeholder="Digite o usuário do GitHub"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* adicionado */}
        <button
          onClick={buscarPerfil}
          disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
</div>

      <p className="muted">
       A requisição acontece somente quando o usuário clicar no botão Buscar.
      </p>

      {loading && <div className="feedback loading">Carregando dados do GitHub...</div>}

      {erro && <div className="feedback error">{erro}</div>}

      {perfil && (
        <div className="result-panel github-profile">
          <img
            src={perfil.avatar_url}
            alt={`Avatar de ${perfil.name}`}
          />
          <div>
            <h3>{perfil.name} (@{perfil.login})</h3>
            <p>{perfil.bio}</p>
            <p><strong>Seguidores:</strong> {perfil.followers}</p>

             {/* adicionado */}
            <p><strong>Seguindo:</strong>{" "}{perfil.following}</p>

            {/* adicionado */}
            <p><strong>Repositórios Públicos:</strong>{" "}{perfil.public_repos}</p>

           {/* adicionado */}
            <p><strong>Localização:</strong>{" "}{perfil.location || "Não informada"}</p>

          </div>
        </div>
      )}
    </section>
  );
}

export default GithubCard;