import { FiX, FiStar, FiShoppingCart } from "react-icons/fi";
import "./ProductModal.css";

function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

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
          size={16}
          className={`modal__star ${i < fullStars ? "modal__star--filled" : ""}`}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <FiX size={24} />
        </button>
        <div className="modal-grid">
          <div className="modal-image-col">
            <div className="modal-image-wrap">
              <img src={product.image} alt={product.name} />
            </div>
          </div>
          <div className="modal-info-col">
            <span className="modal-category">{product.category}</span>
            <h2 className="modal-title">{product.name}</h2>
            
            <div className="modal-rating">
              <div className="modal-stars">{renderStars(product.rating)}</div>
              <span className="modal-rating-val">{product.rating}</span>
              <span className="modal-reviews">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            <div className="modal-price-row">
              <span className="modal-price">{formatPrice(product.price)}</span>
              <span className="modal-original">{formatPrice(product.originalPrice)}</span>
              <span className="modal-discount">{product.discount}% off</span>
            </div>

            <p className="modal-description">{product.description}</p>

            <button
              className="modal-add-btn"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
            >
              <FiShoppingCart size={18} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductModal;
