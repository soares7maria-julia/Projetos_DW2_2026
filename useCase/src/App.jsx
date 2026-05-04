import { useState } from 'react';

// 1. Contador com limite
/*
function App() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <h2>Contador: {contador}</h2>

      <button
        onClick={() => setContador(prev => prev - 1)}
        disabled={contador === 0}
      >
        -
      </button>

      <button
        onClick={() => setContador(prev => prev + 1)}
        disabled={contador === 10}
      >
        +
      </button>

      <button onClick={() => setContador(0)}>Reset</button>
    </div>
  );
}

export default App;
*/



// 2. Toggle de tema claro/escuro

/*
function App() {
  const [temaEscuro, setTemaEscuro] = useState(false);

  return (
    <div
      style={{
        backgroundColor: temaEscuro ? '#000' : '#fff',
        color: temaEscuro ? '#fff' : '#000',
        height: '100vh',
        padding: '20px',
      }}
    >
      <button onClick={() => setTemaEscuro(prev => !prev)}>
        {temaEscuro ? 'Modo claro' : 'Modo escuro'}
      </button>

      <h1>Exemplo de tema</h1>
    </div>
  );
}

export default App;
*/

// 3. Formulário de cadastro com validação simples

/*
function App() {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
  }

  const valido =
    usuario.nome !== '' &&
    usuario.email !== '' &&
    usuario.senha.length >= 6;

  function cadastrar() {
    alert('Cadastrado!');
  }

  return (
    <div>
      <h2>Cadastro</h2>

      <input name="nome" placeholder="Nome" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="senha" type="password" placeholder="Senha" onChange={handleChange} />

      <button disabled={!valido} onClick={cadastrar}>
        Cadastrar
      </button>

      <pre>{JSON.stringify(usuario, null, 2)}</pre>
    </div>
  );
}

export default App;
*/



// 4. Lista de tarefas (mini to-do)
/*
function App() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState('');

  function adicionar() {
    if (texto.trim() === '') return;

    setTarefas(prev => [
      ...prev,
      { id: Date.now(), texto, concluida: false },
    ]);

    setTexto('');
  }

  function toggle(id) {
    setTarefas(prev =>
      prev.map(t =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      )
    );
  }

  function remover(id) {
    setTarefas(prev => prev.filter(t => t.id !== id));
  }

  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;

  return (
    <div>
      <h2>To-do</h2>

      <input value={texto} onChange={e => setTexto(e.target.value)} />
      <button onClick={adicionar}>Adicionar</button>

      {total === 0 && <p>Nenhuma tarefa ainda</p>}

      <ul>
        {tarefas.map(t => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.concluida}
              onChange={() => toggle(t.id)}
            />
            {t.texto}
            <button onClick={() => remover(t.id)}>X</button>
          </li>
        ))}
      </ul>

      {total > 0 && (
        <p>{concluidas} de {total} tarefas concluídas</p>
      )}

      {total > 0 && concluidas === total && (
        <p>🎉 Parabéns!</p>
      )}
    </div>
  );
}

export default App;
*/



// 5. Carrinho de compras simplificado
/*
function Loja({ produtos, aoAdicionar }) {
  return (
    <div>
      <h2>Loja</h2>
      {produtos.map(p => (
        <div key={p.id}>
          {p.nome} - R$ {p.preco}
          <button onClick={() => aoAdicionar(p)}>Adicionar</button>
        </div>
      ))}
    </div>
  );
}

function Carrinho({ itens }) {
  const total = itens.reduce((soma, i) => soma + i.preco, 0);

  return (
    <div>
      <h2>Carrinho</h2>
      {itens.map((i, index) => (
        <div key={index}>{i.nome}</div>
      ))}
      <p>Total: R$ {total}</p>
    </div>
  );
}

function App() {
  const [carrinho, setCarrinho] = useState([]);

  const produtos = [
    { id: 1, nome: 'Teclado', preco: 150 },
    { id: 2, nome: 'Mouse', preco: 80 },
    { id: 3, nome: 'Monitor', preco: 900 },
    { id: 4, nome: 'Headset', preco: 200 },
  ];

  function adicionar(produto) {
    setCarrinho(prev => [...prev, produto]);
  }

  return (
    <div style={{ display: 'flex', gap: '50px' }}>
      <Loja produtos={produtos} aoAdicionar={adicionar} />
      <Carrinho itens={carrinho} />
    </div>
  );
}

export default App;
*/

// 6. Senha forte com feedback em tempo real
/*
function App() {
  const [senha, setSenha] = useState('');

  const tem8 = senha.length >= 8;
  const temNumero = /\d/.test(senha);
  const temMaiuscula = /[A-Z]/.test(senha);

  const valido = tem8 && temNumero && temMaiuscula;

  function salvar() {
    alert('Senha aceita!');
  }

  function cor(cond) {
    return { color: cond ? 'green' : 'red' };
  }

  return (
    <div>
      <h2>Senha</h2>

      <input
        type="password"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />

      <p style={cor(tem8)}>
        {tem8 ? '✓' : '✗'} Pelo menos 8 caracteres
      </p>

      <p style={cor(temNumero)}>
        {temNumero ? '✓' : '✗'} Pelo menos um número
      </p>

      <p style={cor(temMaiuscula)}>
        {temMaiuscula ? '✓' : '✗'} Pelo menos uma maiúscula
      </p>

      <button disabled={!valido} onClick={salvar}>
        Salvar
      </button>
    </div>
  );
}

export default App;
*/