import { Link } from "react-router";

export default function Salas({ salas, reservas }) {
  return (
    <main>
      <p className="sobretitulo">Espaços disponíveis</p>
      <h1>Salas de aula</h1>
      <ul className="lista-salas">
        {salas.map((sala) => {
          const quantidade = reservas.filter(
            (reserva) => reserva.salaId === sala.id && reserva.status !== "cancelada",
          ).length;
          return (
            <li key={sala.id}>
              <h2><Link to={`/salas/${sala.id}`}>{sala.nome}</Link></h2>
              <p>{sala.bloco} · capacidade para {sala.capacidade} pessoas</p>
              <p>{quantidade} reserva(s) ativa(s) hoje</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
