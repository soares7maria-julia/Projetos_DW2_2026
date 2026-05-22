import { useState, useEffect } from "react";

// ============================================================================
// EXERCÍCIO 1: O Rastreador de Título (Dependências)
// ============================================================================
function Exercicio1() {
  const [texto, setTexto] = useState("");
  const [contador, setContador] = useState(0);
  
// Mudança
  useEffect(() => {
  document.title = texto;
  console.log("Título atualizado!");
}, [texto]);
///

  return (
    <div style={boxStyle}>
      <h3 style={{ marginTop: 0, color: '#333' }}>1. O Rastreador de Título</h3>
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite para mudar a aba do navegador..."
        style={inputStyle}
      />
      <button style={buttonStyle} onClick={() => setContador(c => c + 1)}>
        Cliques ignorados pelo efeito: {contador}
      </button>
    </div>
  );
}

// ============================================================================
// EXERCÍCIO 2: O Cronômetro Caótico (Função de Limpeza)
// ============================================================================
function Cronometro() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSegundos((s) => s + 1);
    }, 1000);

// Mudança
  return () => {
    clearInterval(timer);
  };

///
  }, []);

  return <h2 style={{ color: '#e53e3e', margin: '10px 0' }}>Tempo ativo: {segundos}s</h2>;
}

function Exercicio2() {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div style={boxStyle}>
      <h3 style={{ marginTop: 0, color: '#333' }}>2. O Cronômetro e a Vassoura</h3>
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        Ative o cronômetro, aguarde alguns segundos, oculte-o e exiba-o novamente. Observe o comportamento dos segundos.
      </p>
      <button style={buttonStyle} onClick={() => setMostrar(!mostrar)}>
        {mostrar ? "❌ Ocultar Cronômetro" : "⏱️ Mostrar Cronômetro"}
      </button>
      {mostrar && <Cronometro />}
    </div>
  );
}

// ============================================================================
// EXERCÍCIO 3: O Cofre Seguro (JSON + localStorage)
// ============================================================================
function Exercicio3() {
  const [dadosUser, setDadosUser] = useState({ nome: "", cargo: "" });

// Mudança
  function salvarNoDisco() {
  const textoJSON = JSON.stringify(dadosUser);

  localStorage.setItem(
    "@play:user",
    textoJSON
  );
///

  alert("Código de salvamento executado!");
}

// Mudança
  function carregarDoDisco() {
  const dadosBrutos =
    localStorage.getItem("@play:user");

  if (dadosBrutos !== null) {
    const objeto =
      JSON.parse(dadosBrutos);

    setDadosUser(objeto);
  }
///
  alert("Código de carregamento executado!");
}

  return (
    <div style={boxStyle}>
      <h3 style={{ marginTop: 0, color: '#333' }}>3. O Cofre Seguro (Serialização)</h3>
      <input
        placeholder="Nome do Profissional"
        value={dadosUser.nome}
        onChange={e => setDadosUser({ ...dadosUser, nome: e.target.value })}
        style={inputStyle}
      /><br/>
      <input
        placeholder="Cargo Ocupado"
        value={dadosUser.cargo}
        onChange={e => setDadosUser({ ...dadosUser, cargo: e.target.value })}
        style={inputStyle}
      /><br/>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button style={{...buttonStyle, backgroundColor: '#2b6cb0'}} onClick={salvarNoDisco}>💾 Salvar no Disco</button>
        <button style={{...buttonStyle, backgroundColor: '#2f855a'}} onClick={carregarDoDisco}>📂 Carregar do Disco</button>
        <button style={{...buttonStyle, backgroundColor: '#718096'}} onClick={() => setDadosUser({ nome: "", cargo: "" })}>Limpar Campos</button>
      </div>
    </div>
  );
}
