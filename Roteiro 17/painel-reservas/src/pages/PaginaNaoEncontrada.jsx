import { Link } from "react-router";

export default function PaginaNaoEncontrada() {
  return (
    <main>
      <p className="sobretitulo">Erro 404</p>
      <h1>Página não encontrada</h1>
      <p>Confira o endereço ou volte para o resumo do painel.</p>
      <Link to="/">Ir para o resumo</Link>
    </main>
  );
}
