import { Link } from "react-router";
import { STATUS_RESERVA } from "../data/reservas";
import StatusReserva from "./StatusReserva";

export default function ListaReservas({ reservas, salas, onAlterarStatus }) {
  function nomeDaSala(salaId) {
    return salas.find((sala) => sala.id === salaId)?.nome ?? "Sala não encontrada";
  }

  if (reservas.length === 0) {
    return <p className="vazio">Nenhuma reserva corresponde a este filtro.</p>;
  }

  return (
    <ul className="lista-reservas">
      {reservas.map((reserva) => (
        <li key={reserva.id}>
          <div>
            <Link to={`/reservas/${reserva.id}`}>{reserva.turma}</Link>
            <p>{nomeDaSala(reserva.salaId)} · {reserva.horario} · {reserva.responsavel}</p>
          </div>
          <div className="acoes-reserva">
            <StatusReserva status={reserva.status} />
            {onAlterarStatus && (
              <label>
                <span className="sr-only">Status da reserva {reserva.id}</span>
                <select
                  value={reserva.status}
                  onChange={(evento) => onAlterarStatus(reserva.id, evento.target.value)}
                >
                  {STATUS_RESERVA.map((status) => <option key={status}>{status}</option>)}
                </select>
              </label>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
