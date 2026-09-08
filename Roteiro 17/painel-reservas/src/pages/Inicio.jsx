import "./../index.css";

export default function App() {
  return (
    <>
      <main>
        <p className="sobretitulo">28 de agosto de 2026</p>
        <h1>Reservas de salas</h1>
        <p>Acompanhe rapidamente a ocupação das salas de aula.</p>
        <section className="resumo">
          <article className="cartao-resumo">
            <p>Em andamento</p>
            <strong>1</strong>
            <small>reservas acontecendo agora</small>
          </article>
          <article className="cartao-resumo">
            <p>Confirmadas</p>
            <strong>4</strong>
            <small>próximas reservas</small>
          </article>
          <article className="cartao-resumo">
            <p>Salas ocupadas</p>
            <strong>3/4</strong>
            <small>salas com reserva ativa</small>
          </article>
        </section>
        <section>
          <h2>Próximas reservas</h2>
          <ul className="lista-reservas">
            <li>
              <div>
                <strong>DW2 — 2º período</strong>
                <p>Sala 101 · 08:00 — 09:40</p>
              </div>
              <span className="status status--confirmada">confirmada</span>
            </li>
            <li>
              <div>
                <strong>ADS — 3º período</strong>
                <p>Sala 204 · 13:30 — 15:10</p>
              </div>
              <span className="status status--andamento">em andamento</span>
            </li>
          </ul>
        </section>
        <section>
          <h2>Salas de aula</h2>
          <ul className="lista-salas">
            <li>
              <strong>Sala 101</strong>
              <p>Bloco A · capacidade para 35 pessoas</p>
            </li>
            <li>
              <strong>Sala 204</strong>
              <p>Bloco B · capacidade para 45 pessoas</p>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}