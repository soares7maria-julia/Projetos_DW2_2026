import { useState } from "react";

function GithubCard() {

  // NOVO: guarda o nome de usuário digitado no input
  const [username, setUsername] = useState("");

  // Continua igual
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [perfil, setPerfil] = useState(null);

  // NOVO: função chamada quando o botão é clicado
  async function buscarPerfil() {

    // NOVO: impede busca vazia
    if (!username.trim()) {
      setErro("Digite um nome de usuário.");
      return;
    }

    // NOVO: inicia uma nova busca
    setLoading(true);
    setErro(null);

    // NOVO: limpa o perfil anterior
    setPerfil(null);

    try {

      // MODIFICADO: usa o nome digitado pelo usuário
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

  return (
    <section className="card">
      <h2>Busca de Perfil GitHub</h2>

       {/* adicionado */}
      <div className="search-row">

        <input
          type="text"
          placeholder="Digite o usuário do GitHub"

          // NOVO: valor controlado pelo estado
          value={username}

          // NOVO: atualiza o estado ao digitar
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* NOVO: botão que dispara a busca */}
        <button
          onClick={buscarPerfil}
          disabled={loading}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>

      </div>

      {/* Continua igual */}
      {loading && (
        <div className="feedback loading">
          Carregando dados do GitHub...
        </div>
      )}

      {/* Continua igual */}
      {erro && (
        <div className="feedback error">
          {erro}
        </div>
      )}

      {/* Continua igual */}
      {perfil && (
        <div className="result-panel github-profile">

          <img
            src={perfil.avatar_url}
            alt={`Avatar de ${perfil.login}`}
          />

          <div>

            <h3>
              {perfil.name} (@{perfil.login})
            </h3>

            <p>{perfil.bio}</p>

            {/* Já existia no roteiro */}
            <p>
              <strong>Seguidores:</strong>
              {" "}
              {perfil.followers}
            </p>

            {/* NOVO: quantidade de pessoas que ele segue */}
            <p>
              <strong>Seguindo:</strong>
              {" "}
              {perfil.following}
            </p>

            {/* NOVO: quantidade de repositórios públicos */}
            <p>
              <strong>Repositórios Públicos:</strong>
              {" "}
              {perfil.public_repos}
            </p>

            {/* NOVO: localização informada no GitHub */}
            <p>
              <strong>Localização:</strong>
              {" "}
              {perfil.location || "Não informada"}
            </p>

          </div>

        </div>
      )}
    </section>
  );
}

export default GithubCard;