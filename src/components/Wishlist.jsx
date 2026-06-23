import { FiX, FiTrash2, FiHeart, FiShoppingCart } from "react-icons/fi";
import "./Wishlist.css";

function Wishlist({ isOpen, onClose, wishlistItems, onRemove, onAddToCart }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <div
        className={`wishlist-overlay ${isOpen ? "wishlist-overlay--open" : ""}`}
        onClick={onClose}
      />
      <div className={`wishlist-sidebar ${isOpen ? "wishlist-sidebar--open" : ""}`}>
        <div className="wishlist-header">
          <h2>
            <FiHeart /> Your Wishlist ({wishlistItems.length})
          </h2>
          <button className="wishlist-close" onClick={onClose} aria-label="Close wishlist">
            <FiX size={24} />
          </button>
        </div>

        <div className="wishlist-body">
          {wishlistItems.length === 0 ? (
            <div className="wishlist-empty">
              <div className="wishlist-empty-icon">❤️</div>
              <h3>Your wishlist is empty</h3>
              <p>Save items you love to review them later.</p>
              <button className="wishlist-continue-btn" onClick={onClose}>
                Explore Products
              </button>
            </div>
          ) : (
            <ul className="wishlist-items">
              {wishlistItems.map((item) => (
                <li key={item.id} className="wishlist-item">
                  <div className="wishlist-item-img-wrap">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="wishlist-item-details">
                    <h4 className="wishlist-item-title">{item.name}</h4>
                    <p className="wishlist-item-price">
                      {formatPrice(item.price)}
                    </p>
                    <div className="wishlist-item-actions">
                      <button
                        className="wishlist-add-cart-btn"
                        onClick={() => {
                          onAddToCart(item);
                          onRemove(item); // remove from wishlist when added to cart
                        }}
                      >
                        <FiShoppingCart size={14} /> Add to Cart
                      </button>
                      <button
                        className="wishlist-remove-btn"
                        onClick={() => onRemove(item)}
                        aria-label="Remove from wishlist"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
