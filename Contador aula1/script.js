let contador = 0;

const valor = document.getElementById("valor");
const botaoIncrementar = document.getElementById("incrementar");
const botaoDecrementar = document.getElementById("decrementar");
const botaoReset = document.getElementById("reset");
const historico = document.getElementById("historico");



function atualizarInterface() {
  valor.textContent = contador;
}

function adicionarHistorico() {
  const div = document.createElement("div");
  div.textContent = contador;
  div.className = "historico-item";
  historico.appendChild(div);
}


botaoIncrementar.addEventListener("click", () => {
  contador++;
  atualizarInterface();
  adicionarHistorico();
});

botaoDecrementar.addEventListener("click", () => {
  contador--;
  atualizarInterface();
  adicionarHistorico();
});

botaoReset.addEventListener("click", () => {
  contador = 0;
  atualizarInterface();
  historico.innerHTML = "";
});
