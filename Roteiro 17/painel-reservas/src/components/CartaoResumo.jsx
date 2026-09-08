export default function CartaoResumo({ titulo, valor, descricao }) {
  return (
    <article className="cartao-resumo">
      <p>{titulo}</p>
      <strong>{valor}</strong>
      <small>{descricao}</small>
    </article>
  );
}
