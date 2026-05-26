import ProductCard from "./ProductCard";
import "./ProductGrid.css";

function ProductGrid({ products, onAddToCart, onProductClick }) {
  return (
    <section className="product-grid" id="product-grid">
      <div className="product-grid__inner">
        <div className="product-grid__header">
          <h2 className="product-grid__title">
            <span className="product-grid__title-icon">🛍️</span>
            Trending Products
          </h2>
          <div className="product-grid__count">
            Showing <strong>{products.length}</strong> products
          </div>
        </div>
        <div className="product-grid__grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
