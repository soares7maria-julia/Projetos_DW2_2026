export const PriceTag = ({ value }) => {
  return (
    <span className="price-tag">
      {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
    </span>
  );
};