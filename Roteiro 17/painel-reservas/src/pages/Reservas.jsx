import { useState } from "react";
import ListaReservas from "../components/ListaReservas";

export default function Reservas({ reservas, salas, onAlterarStatus }) {
  const [filtro, setFiltro] = useState("todas");
  const reservasFiltradas = filtro === "todas"
    ? reservas
    : reservas.filter((reserva) => reserva.status === filtro);

  return (
    <main>
      <p className="sobretitulo">Agenda do dia</p>
      <h1>Reservas</h1>
      <label className="filtro">
        Situação
        <select value={filtro} onChange={(evento) => setFiltro(evento.target.value)}>
          <option value="todas">Todas</option>
          <option value="confirmada">Confirmada</option>
          <option value="em andamento">Em andamento</option>
          <option value="concluída">Concluída</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </label>
      <ListaReservas reservas={reservasFiltradas} salas={salas} onAlterarStatus={onAlterarStatus} />
    </main>
  );
}
