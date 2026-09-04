import { useState } from "react";
import { Route, Routes } from "react-router";
import Cabecalho from "./components/Cabecalho";
import { atualizarStatusReserva, reservas, salas } from "./data/reservas";
import DetalheReserva from "./pages/DetalheReserva";
import DetalheSala from "./pages/DetalheSala";
import Inicio from "./pages/Inicio";
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada";
import Reservas from "./pages/Reservas";
import Salas from "./pages/Salas";

export default function App() {
  const [reservasAtuais, setReservasAtuais] = useState(reservas);

  function mudarStatus(id, novoStatus) {
    setReservasAtuais((estadoAnterior) =>
      atualizarStatusReserva(estadoAnterior, id, novoStatus),
    );
  }

  return (
    <>
      <Cabecalho reservas={reservasAtuais} />
      <Routes>
        <Route path="/" element={<Inicio reservas={reservasAtuais} salas={salas} />} />
        <Route path="/reservas" element={<Reservas reservas={reservasAtuais} salas={salas} onAlterarStatus={mudarStatus} />} />
        <Route path="/reservas/:id" element={<DetalheReserva reservas={reservasAtuais} salas={salas} onAlterarStatus={mudarStatus} />} />
        <Route path="/salas" element={<Salas salas={salas} reservas={reservasAtuais} />} />
        <Route path="/salas/:id" element={<DetalheSala reservas={reservasAtuais} salas={salas} onAlterarStatus={mudarStatus} />} />
        <Route path="*" element={<PaginaNaoEncontrada />} />
      </Routes>
    </>
  );
}
