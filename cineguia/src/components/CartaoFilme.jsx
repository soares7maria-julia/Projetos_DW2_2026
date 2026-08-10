import { Link } from "react-router";

export default function CartaoFilme({ filme }) {
  return (
    <article className="cartao-filme">
      <p className="capa" aria-hidden="true">
        {filme.capa}
      </p>
      <h2>{filme.titulo}</h2>
      <p>
        {filme.ano} · {filme.genero}
      </p>
      <Link to={`/filmes/${filme.id}`}>Ver detalhes</Link>
    </article>
  );
}