import ProductCard from "./ProductCard";
import "./ProductGrid.css";

function ProductGrid({ products, wishlistItems, activeFilter, onClearFilter, onAddToCart, onToggleWishlist, onProductClick }) {
  return (
    <section className="product-grid" id="product-grid">
      <div className="product-grid__inner">
        <div className="product-grid__header">
          <div className="product-grid__header-left">
            <h2 className="product-grid__title">
              <span className="product-grid__title-icon">🛍️</span>
              {activeFilter !== "all" ? "Filtered Products" : "Trending Products"}
            </h2>
            {activeFilter !== "all" && (
              <button className="product-grid__clear-pill" onClick={onClearFilter}>
                {activeFilter} ✕
              </button>
            )}
          </div>
          <div className="product-grid__count">
            Showing <strong>{products.length}</strong> products
          </div>
        </div>
        <div className="product-grid__grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWished={wishlistItems.some((item) => item.id === product.id)}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
