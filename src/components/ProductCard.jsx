import { FiStar, FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import "./ProductCard.css";

function ProductCard({ product, isWished, onAddToCart, onToggleWishlist, onProductClick }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FiStar
          key={i}
          size={12}
          className={`product-card__star ${i < fullStars ? "product-card__star--filled" : ""}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="product-card" id={`product-${product.id}`} onClick={() => onProductClick(product)}>
      {/* Badge */}
      {product.badge && (
        <span className="product-card__badge">{product.badge}</span>
      )}

      {/* Wishlist */}
      <button
        className={`product-card__wishlist ${isWished ? "product-card__wishlist--active" : ""}`}
        id={`wishlist-${product.id}`}
        aria-label="Add to wishlist"
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
      >
        {isWished ? <FaHeart size={16} color="#ff4757" /> : <FiHeart size={16} />}
      </button>

      {/* Image */}
      <div className="product-card__img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__img"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="product-card__info">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__name">{product.name}</h3>

        {/* Rating */}
        <div className="product-card__rating">
          <div className="product-card__stars">{renderStars(product.rating)}</div>
          <span className="product-card__rating-val">{product.rating}</span>
          <span className="product-card__reviews">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="product-card__price-row">
          <span className="product-card__price">
            {formatPrice(product.price)}
          </span>
          <span className="product-card__original">
            {formatPrice(product.originalPrice)}
          </span>
          <span className="product-card__discount">
            {product.discount}% off
          </span>
        </div>

        {/* Add to Cart */}
        <button
          className="product-card__add-btn"
          id={`add-to-cart-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          <FiShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
