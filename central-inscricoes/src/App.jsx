import { useState } from "react";
import "./App.css";

const valoresIniciais = {
  nome: "",
  email: "",
  confirmarEmail: "",
  idade: "",
  trilha: "",
  portfolio: "",
  aceitaTermos: false,
};

function MensagemErro({ id, mensagem }) {
  if (!mensagem) {
    return null;
  }

  return (
    <span className="error-message" id={id} role="alert">
      {mensagem}
    </span>
  );
}

function validarFormulario(valores) {
  const errosEncontrados = {};
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const idadeNumerica = Number(valores.idade);

  let portfolioValido = false;

  try {
    const url = new URL(valores.portfolio);
    portfolioValido = url.protocol === "http:" || url.protocol === "https:";
  } catch {
    portfolioValido = false;
  }

  if (valores.nome.trim().length < 3) {
    errosEncontrados.nome = "Informe um nome com pelo menos 3 caracteres.";
  }

  if (!emailValido.test(valores.email.trim())) {
    errosEncontrados.email = "Informe um e-mail válido.";
  }

 const emailNormalizado = valores.email.trim().toLowerCase();
 const confirmarEmailNormalizado =
  valores.confirmarEmail.trim().toLowerCase();

 if (
  !confirmarEmailNormalizado ||
  emailNormalizado !== confirmarEmailNormalizado
 ) {
  errosEncontrados.confirmarEmail =
    "Os e-mails precisam ser iguais.";
 }
 if (
    valores.idade === "" ||
    !Number.isInteger(idadeNumerica) ||
    idadeNumerica < 14 ||
    idadeNumerica > 120
  ) {
    errosEncontrados.idade =
      "Informe uma idade inteira entre 14 e 120 anos.";
  }

  if (!valores.trilha) {
    errosEncontrados.trilha = "Escolha uma trilha.";
  }

  if (!portfolioValido) {
    errosEncontrados.portfolio =
      "Informe uma URL completa iniciada por http:// ou https://.";
  }

  if (!valores.aceitaTermos) {
    errosEncontrados.aceitaTermos =
      "Você precisa aceitar as regras de participação.";
  }

 const dadosNormalizados = {
  nome: valores.nome.trim(),
  email: valores.email.trim().toLowerCase(),
  idade: idadeNumerica,
  trilha: valores.trilha,
  portfolio: valores.portfolio.trim(),
  aceitaTermos: valores.aceitaTermos,
};

  return {
    erros: errosEncontrados,
    dados: dadosNormalizados,
  };
}

export default function App() {
  const [formulario, setFormulario] = useState(valoresIniciais);
  const [erros, setErros] = useState({});
  const [tocados, setTocados] = useState({});
  const [status, setStatus] = useState("editando");
  
function handleChange(event) {
  const { name, value, type, checked } = event.target;
  const novoValor = type === "checkbox" ? checked : value;

  const formularioAtualizado = {
    ...formulario,
    [name]: novoValor,
  };

  setFormulario(formularioAtualizado);
  setStatus("editando");

  if (tocados[name]) {
    const resultado = validarFormulario(formularioAtualizado);

    setErros((atuais) => ({
      ...atuais,
      [name]: resultado.erros[name],
    }));
  }
}

function handleBlur(event) {
  const campo = event.target.name;
  const resultado = validarFormulario(formulario);

  setTocados((atuais) => ({
    ...atuais,
    [campo]: true,
  }));

  setErros((atuais) => ({
    ...atuais,
    [campo]: resultado.erros[campo],
  }));
}

async function handleSubmit(event) {
  event.preventDefault();

  const resultado = validarFormulario(formulario);
  const possuiErros = Object.keys(resultado.erros).length > 0;

  setErros(resultado.erros);
  setTocados({
  nome: true,
  email: true,
  confirmarEmail: true,
  idade: true,
  trilha: true,
  portfolio: true,
  aceitaTermos: true,
});

  if (possuiErros) {
    setStatus("editando");
    return;
  }

  setStatus("enviando");

  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log("Dados prontos para a API:", resultado.dados);
  setStatus("sucesso");
}

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Laboratório de formulários</p>
        <h1>Central de Inscrições DW2</h1>
        <p>
          Preencha seus dados para participar de uma trilha de estudos.
        </p>
      </section>

      <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="field">
  <label htmlFor="nome">Nome completo</label>
  <input
    id="nome"
    name="nome"
    value={formulario.nome}
    onChange={handleChange}
    onBlur={handleBlur}
    aria-invalid={Boolean(erros.nome)}
    aria-describedby={erros.nome ? "erro-nome" : undefined}
  />
  <MensagemErro id="erro-nome" mensagem={erros.nome} />
</div>

<div className="field">
  <label htmlFor="email">E-mail</label>
  <input
    id="email"
    name="email"
    type="email"
    value={formulario.email}
    onChange={handleChange}
    onBlur={handleBlur}
    aria-invalid={Boolean(erros.email)}
    aria-describedby={erros.email ? "erro-email" : undefined}
  />
  <MensagemErro id="erro-email" mensagem={erros.email} />
</div>

<div className="field">
  <label htmlFor="confirmarEmail">Confirmar e-mail</label>
  <input
    id="confirmarEmail"
    name="confirmarEmail"
    type="email"
    value={formulario.confirmarEmail}
    onChange={handleChange}
    onBlur={handleBlur}
    aria-invalid={Boolean(erros.confirmarEmail)}
    aria-describedby={
      erros.confirmarEmail ? "erro-confirmarEmail" : undefined
    }
  />
  <MensagemErro
    id="erro-confirmarEmail"
    mensagem={erros.confirmarEmail}
  />
</div>

<div className="field">
  <label htmlFor="idade">Idade</label>
  <input
    id="idade"
    name="idade"
    type="number"
    value={formulario.idade}
    onChange={handleChange}
    onBlur={handleBlur}
    aria-invalid={Boolean(erros.idade)}
    aria-describedby={erros.idade ? "erro-idade" : undefined}
  />
  <MensagemErro id="erro-idade" mensagem={erros.idade} />
</div>

<div className="field">
  <label htmlFor="trilha">Trilha de estudos</label>
  <select
    id="trilha"
    name="trilha"
    value={formulario.trilha}
    onChange={handleChange}
    onBlur={handleBlur}
    aria-invalid={Boolean(erros.trilha)}
    aria-describedby={erros.trilha ? "erro-trilha" : undefined}
  >
    <option value="">Selecione uma trilha</option>
    <option value="frontend">Frontend</option>
    <option value="apis">APIs REST</option>
    <option value="banco-de-dados">Banco de dados</option>
  </select>
  <MensagemErro id="erro-trilha" mensagem={erros.trilha} />
</div>

<div className="field">
  <label htmlFor="portfolio">Portfólio</label>
  <input
    id="portfolio"
    name="portfolio"
    placeholder="<https://meu-site.dev>"
    value={formulario.portfolio}
    onChange={handleChange}
    onBlur={handleBlur}
    aria-invalid={Boolean(erros.portfolio)}
    aria-describedby={erros.portfolio ? "erro-portfolio" : undefined}
  />
  <MensagemErro id="erro-portfolio" mensagem={erros.portfolio} />
</div>

<div className="field">
  <label className="checkbox-row">
    <input
      name="aceitaTermos"
      type="checkbox"
      checked={formulario.aceitaTermos}
      onChange={handleChange}
      onBlur={handleBlur}
      aria-invalid={Boolean(erros.aceitaTermos)}
      aria-describedby={
        erros.aceitaTermos ? "erro-aceitaTermos" : undefined
      }
    />
    Aceito as regras de participação.
  </label>
  <MensagemErro
    id="erro-aceitaTermos"
    mensagem={erros.aceitaTermos}
  />
</div>

<button type="submit" disabled={status === "enviando"}>
  {status === "enviando" ? "Enviando..." : "Solicitar inscrição"}
</button>

{status === "sucesso" && (
  <p className="success-message" role="status">
    Inscrição enviada com sucesso.
  </p>
)}

<details className="debug-panel">
  <summary>Inspecionar estado do formulário</summary>
  <pre>{JSON.stringify(formulario, null, 2)}</pre>
</details>
      </form>
    </main>
  );
}