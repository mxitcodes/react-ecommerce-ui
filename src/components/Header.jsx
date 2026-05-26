import { useState } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiMapPin,
  FiChevronDown,
  FiHeart,
} from "react-icons/fi";
import "./Header.css";

function Header({ cartCount, onSearch, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const navLinks = [
    "Fresh",
    "MiniTV",
    "Sell",
    "Best Sellers",
    "Today's Deals",
    "Mobiles",
    "Electronics",
    "Fashion",
    "Prime",
    "Home & Kitchen",
  ];

  return (
    <header className="header" id="main-header">
      {/* Top Bar */}
      <div className="header__top">
        <div className="header__top-inner">
          {/* Logo */}
          <div className="header__logo" id="logo">
            <button
              className="header__menu-btn"
              id="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
            <h1 className="header__logo-text">
              Shop<span className="header__logo-accent">Kart</span>
              <span className="header__logo-dot">.in</span>
            </h1>
          </div>

          {/* Delivery Location */}
          <div className="header__delivery" id="delivery-location">
            <FiMapPin size={16} className="header__delivery-icon" />
            <div className="header__delivery-text">
              <span className="header__delivery-label">Deliver to</span>
              <span className="header__delivery-location">India 110001</span>
            </div>
          </div>

          {/* Search Bar */}
          <form
            className={`header__search ${searchFocused ? "header__search--focused" : ""}`}
            id="search-bar"
            onSubmit={handleSearch}
          >
            <select className="header__search-category" id="search-category">
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="mobiles">Mobiles</option>
              <option value="home">Home</option>
            </select>
            <input
              type="text"
              className="header__search-input"
              id="search-input"
              placeholder="Search for products, brands and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <button
              type="submit"
              className="header__search-btn"
              id="search-button"
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>
          </form>

          {/* Right Actions */}
          <div className="header__actions">
            <div className="header__action" id="account-dropdown">
              <FiUser size={20} />
              <div className="header__action-text">
                <span className="header__action-label">Hello, Sign in</span>
                <span className="header__action-value">
                  Account & Lists <FiChevronDown size={12} />
                </span>
              </div>
            </div>

            <div className="header__action" id="wishlist">
              <FiHeart size={20} />
              <div className="header__action-text">
                <span className="header__action-label">Your</span>
                <span className="header__action-value">Wishlist</span>
              </div>
            </div>

            <div className="header__action header__cart" id="cart-button" onClick={onCartClick}>
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="header__cart-count">{cartCount}</span>
              )}
              <span className="header__action-value">Cart</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay — closes menu when clicking outside */}
      {menuOpen && (
        <div
          className="header__overlay"
          id="nav-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Navigation Bar */}
      <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`} id="navigation">
        {/* Close button inside mobile nav */}
        <button
          className="header__nav-close"
          id="nav-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <FiX size={20} />
          <span>Close Menu</span>
        </button>
        <ul className="header__nav-list">
          {navLinks.map((link, index) => (
            <li key={index} className="header__nav-item">
              <a href="#" className="header__nav-link" id={`nav-link-${index}`}>
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
