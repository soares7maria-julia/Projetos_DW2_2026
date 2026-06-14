import { useState } from "react";

function BuscadorCep() {
  const [cep, setCep] = useState("");
  // A Tríade de Estados da Rede
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [endereco, setEndereco] = useState(null);

  // A função que vai na internet (acionada por clique)
  async function buscarCep() {
    if (cep.length !== 8) {
      setErro("O CEP deve conter exatos 8 números.");
      setEndereco(null);
      return;
    }

    setLoading(true);
    setErro(null);
    setEndereco(null); // Limpa o endereço antigo, se existir

    try {
      // 1º Await: Vai no ViaCEP
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      if (!resposta.ok) {
        throw new Error("Nao foi possivel consultar o ViaCEP agora.");
      }

      // 2º Await: Converte a resposta pra objeto
      const dados = await resposta.json();

      // A API do ViaCEP retorna um { erro: "true" } se o CEP não existir no país
      if (dados.erro) {
        setErro("CEP não encontrado.");
      } else {
        setEndereco(dados);
      }
    } catch (error) {
      // Cai aqui se a pessoa ficar sem internet no meio da requisição
      setErro("Falha na conexão com a internet.");
    } finally {
      // Garante que o reloginho pare de girar, dando certo ou errado
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <h2>Buscador de CEP</h2>
      <p className="muted">
        Aqui a requisicao acontece por evento: so quando a pessoa clicar no botao.
      </p>

      <div className="search-row">
        <input
          type="text"
          placeholder="Digite apenas numeros (Ex: 01001000)"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
          maxLength={8}
        />
        <button onClick={buscarCep} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {/* Renderização Baseada na Tríade */}
      {loading && <div className="feedback loading">Consultando o ViaCEP...</div>}
      {erro && <div className="feedback error">{erro}</div>}

      {endereco && (
        <div className="result-panel">
          <p><strong>Logradouro:</strong> {endereco.logradouro}</p>
          <p><strong>Bairro:</strong> {endereco.bairro}</p>
          <p><strong>Localidade:</strong> {endereco.localidade} - {endereco.uf}</p>
        </div>
      )}
    </section>
  );
}

export default BuscadorCep;