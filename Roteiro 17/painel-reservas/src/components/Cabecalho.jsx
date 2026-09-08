import { NavLink } from "react-router";

export default function Cabecalho({ reservas }) {
  const emAndamento = reservas.filter((reserva) => reserva.status === "em andamento").length;

  function classeDoLink({ isActive }) {
    return isActive ? "ativo" : undefined;
  }

  return (
    <header className="cabecalho">
      <NavLink className="marca" to="/" end>
        Reservas
      </NavLink>
      <nav aria-label="Navegação principal">
        <NavLink className={classeDoLink} to="/" end>Resumo</NavLink>
        <NavLink className={classeDoLink} to="/reservas">Reservas</NavLink>
        <NavLink className={classeDoLink} to="/salas">Salas</NavLink>
      </nav>
      <p className="contador" aria-label="Reservas em andamento">
        {emAndamento} em andamento
      </p>
    </header>
  );
}
