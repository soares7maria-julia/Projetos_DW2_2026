import { Link, useParams } from "react-router";
import ListaReservas from "../components/ListaReservas";
import { encontrarSalaPorId, reservasDaSala } from "../data/reservas";

export default function DetalheSala({ reservas, salas, onAlterarStatus }) {
  const { id } = useParams();
  const sala = encontrarSalaPorId(id);

  if (!sala) {
    return (
      <main>
        <h1>Sala não encontrada</h1>
        <p>O endereço informado não corresponde a uma sala cadastrada.</p>
        <Link to="/salas">Ver todas as salas</Link>
      </main>
    );
  }

  const reservasDaSalaAtual = reservasDaSala(sala.id, reservas);

  return (
    <main>
      <p className="sobretitulo">{sala.bloco}</p>
      <h1>{sala.nome}</h1>
      <p>Capacidade para {sala.capacidade} pessoas.</p>
      <h2>Agenda do dia</h2>
      <ListaReservas reservas={reservasDaSalaAtual} salas={salas} onAlterarStatus={onAlterarStatus} />
      <p><Link to="/salas">Voltar para salas</Link></p>
    </main>
  );
}
