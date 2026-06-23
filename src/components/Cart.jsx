import { useState } from "react";
import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiTruck, FiTag } from "react-icons/fi";
import "./Cart.css";

function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemove, onCheckout }) {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);
  const FREE_SHIPPING_THRESHOLD = 5000;
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const totalAmount = Math.max(0, subtotal - discount);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE20") {
      setDiscount(subtotal * 0.2); // 20% off
      setPromoMessage({ text: "20% discount applied!", type: "success" });
    } else if (promoCode.toUpperCase() === "FREESHIP") {
      setPromoMessage({ text: "Free shipping code applied!", type: "success" });
    } else {
      setDiscount(0);
      setPromoMessage({ text: "Invalid promo code.", type: "error" });
    }
  };

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

        {cartItems.length > 0 && (
          <div className="cart-shipping-progress">
            <div className="shipping-msg">
              <FiTruck />
              {amountToFreeShipping > 0 
                ? <span>Add <strong>{formatPrice(amountToFreeShipping)}</strong> more to get Free Shipping!</span>
                : <span className="success-text">You've unlocked Free Shipping!</span>}
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        )}

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
            <div className="promo-section">
              <div className="promo-input-group">
                <FiTag className="promo-icon" />
                <input 
                  type="text" 
                  placeholder="Enter promo code (e.g. SAVE20)" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button onClick={handleApplyPromo}>Apply</button>
              </div>
              {promoMessage && (
                <p className={`promo-msg promo-msg--${promoMessage.type}`}>{promoMessage.text}</p>
              )}
            </div>

            <div className="cart-summary-calc">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row discount-row">
                  <span>Discount:</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="summary-row total-row">
                <span>Total:</span>
                <strong>{formatPrice(totalAmount)}</strong>
              </div>
            </div>
            <button className="checkout-btn" onClick={onCheckout}>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
