import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ items }) => {
  return (
    <div className="product-grid">
      {items.map((prod) => (
        <ProductCard key={prod.id} info={prod} />
      ))}
    </div>
  );
};