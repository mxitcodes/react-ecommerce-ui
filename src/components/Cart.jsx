import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import "./Cart.css";

function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemove }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "cart-overlay--open" : ""}`}
        onClick={onClose}
      />
      <div className={`cart-sidebar ${isOpen ? "cart-sidebar--open" : ""}`}>
        <div className="cart-header">
          <h2>
            <FiShoppingBag /> Your Cart ({cartItems.length})
          </h2>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">
            <FiX size={24} />
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added anything yet.</p>
              <button className="cart-continue-btn" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.product.id} className="cart-item">
                  <div className="cart-item-img-wrap">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.product.name}</h4>
                    <p className="cart-item-price">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="cart-item-actions">
                      <div className="cart-quantity">
                        <button
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => onRemove(item.product.id)}
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

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <strong>{formatPrice(totalAmount)}</strong>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
