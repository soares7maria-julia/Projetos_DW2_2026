import { PriceTag } from "./PriceTag";

export const ProductCard = ({ info }) => {
  const { nome, categoria, preco, icon, cor } = info;

  return (
    <div className="product-card" style={{ '--accent-color': cor }}>
      <div className="card-header">
        <div className="icon-wrapper">
          <img
            src={`https://unpkg.com/lucide-static@latest/icons/${icon}.svg`}
            alt={nome}
            className="icon-img"
          />
        </div>
        <img
          src="https://unpkg.com/lucide-static@latest/icons/arrow-up-right.svg"
          alt=""
          className="action-icon"
        />
      </div>

      <div className="card-body">
        <span className="category">{categoria}</span>
        <h3 className="product-name">{nome}</h3>
      </div>

      <div className="card-footer">
        <div className="price-info">
          <span className="price-label">A partir de</span>
          <PriceTag value={preco} />
        </div>
        <button className="buy-btn" type="button" aria-label={`Comprar ${nome}`}>
          <img
            src="https://unpkg.com/lucide-static@latest/icons/shopping-cart.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};