import { Link, useParams } from "react-router";
import { STATUS_RESERVA, encontrarReservaPorId } from "../data/reservas";
import StatusReserva from "../components/StatusReserva";

export default function DetalheReserva({ reservas, salas, onAlterarStatus }) {
  const { id } = useParams();
  const reserva = encontrarReservaPorId(reservas, id);

  if (!reserva) {
    return (
      <main>
        <h1>Reserva não encontrada</h1>
        <p>O endereço informado não corresponde a uma reserva cadastrada.</p>
        <Link to="/reservas">Ver todas as reservas</Link>
      </main>
    );
  }

  const sala = salas.find((item) => item.id === reserva.salaId);

  return (
    <main>
      <p className="sobretitulo">Detalhe da reserva</p>
      <h1>{reserva.turma}</h1>
      <dl className="detalhes">
        <div><dt>Sala</dt><dd>{sala?.nome}</dd></div>
        <div><dt>Responsável</dt><dd>{reserva.responsavel}</dd></div>
        <div><dt>Data e horário</dt><dd>{reserva.data} · {reserva.horario}</dd></div>
        <div><dt>Situação</dt><dd><StatusReserva status={reserva.status} /></dd></div>
      </dl>
      <label className="filtro">
        Atualizar situação
        <select value={reserva.status} onChange={(evento) => onAlterarStatus(reserva.id, evento.target.value)}>
          {STATUS_RESERVA.map((status) => <option key={status}>{status}</option>)}
        </select>
      </label>
      <p><Link to={`/salas/${reserva.salaId}`}>Ver agenda da sala</Link></p>
      <p><Link to="/reservas">Voltar para reservas</Link></p>
    </main>
  );
}
