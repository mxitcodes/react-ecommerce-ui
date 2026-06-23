import { useState, useCallback, useEffect } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import CategoryBar from "./components/CategoryBar";
import DealsSection from "./components/DealsSection";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import ProductModal from "./components/ProductModal";
import LoginModal from "./components/LoginModal";
import ToastContainer from "./components/ToastContainer";
import products from "./data/products";

function App() {
  // State management using useState
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('shopkart_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('shopkart_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('shopkart_darkmode');
    return saved ? JSON.parse(saved) : false;
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeFilter, setActiveFilter] = useState("all");
  const [toasts, setToasts] = useState([]);

  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkMode]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('shopkart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('shopkart_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('shopkart_darkmode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Toast notification utility — array based for stacking
  const showToastMessage = useCallback((message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // Add to cart handler
  const handleAddToCart = useCallback(
    (product) => {
      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.product.id === product.id);
        if (existingItem) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
      showToastMessage(`✅ ${product.name} added to cart!`);
    },
    [showToastMessage]
  );

  // Wishlist handler
  const handleToggleWishlist = useCallback((product) => {
    let wasAdded = false;
    
    setWishlistItems((prev) => {
      const isWished = prev.some((p) => p.id === product.id);
      wasAdded = !isWished;
      
      return isWished 
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product];
    });
    
    // Show toast outside the state updater (which runs twice in StrictMode)
    if (wasAdded) {
      showToastMessage("❤️ Added to wishlist");
    } else {
      showToastMessage("💔 Removed from wishlist");
    }
  }, [showToastMessage]);

  // Cart handlers
  const handleUpdateQuantity = useCallback((productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const handleRemoveFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToastMessage("🗑️ Item removed from cart");
  }, [showToastMessage]);

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) return;
    setCartItems([]);
    setIsCartOpen(false);
    showToastMessage("🎉 Order placed successfully!");
  }, [cartItems.length, showToastMessage]);

  const handleBuyNow = useCallback((product) => {
    setSelectedProduct(null);
    showToastMessage(`🎉 Order placed successfully for ${product.name}!`);
  }, [showToastMessage]);

  // Search handler — filters products by name or category
  const handleSearch = useCallback(
    (query) => {
      if (!query.trim()) {
        setFilteredProducts(products);
        setActiveFilter("all");
        return;
      }
      const lowerQuery = query.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.category.toLowerCase().includes(lowerQuery)
      );
      setFilteredProducts(filtered);
      setActiveFilter(`Search: "${query}"`);

      if (filtered.length === 0) {
        showToastMessage("🔍 No products found. Showing all products.");
        setFilteredProducts(products);
      } else {
        showToastMessage(`🔍 Found ${filtered.length} product(s)`);
      }
    },
    [showToastMessage]
  );

  // Category filter handler
  const handleCategorySelect = useCallback((category) => {
    if (category.toLowerCase() === "all") {
      setFilteredProducts(products);
      setActiveFilter("all");
      showToastMessage("Showing all products");
    } else {
      const filtered = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
      setActiveFilter(category);
      showToastMessage(`Showing ${category} products`);
    }
  }, [showToastMessage]);

  return (
    <div className="app" id="app-root">
      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        wishlistCount={wishlistItems.length}
        onSearch={handleSearch} 
        onCategorySelect={handleCategorySelect}
        onCartClick={() => setIsCartOpen(true)} 
        onWishlistClick={() => setIsWishlistOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        user={user}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogout={() => {
          setUser(null);
          showToastMessage("👋 Signed out successfully");
        }}
      />
      <main>
        <Banner />
        <CategoryBar onCategorySelect={handleCategorySelect} />
        <DealsSection />
        <ProductGrid
          products={filteredProducts}
          wishlistItems={wishlistItems}
          activeFilter={activeFilter}
          onClearFilter={() => handleCategorySelect("all")}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onProductClick={setSelectedProduct}
        />
      </main>
      <Footer />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <Wishlist
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemove={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={(userData) => {
          setUser(userData);
          showToastMessage(`👋 Welcome back, ${userData.name}!`);
        }}
      />

      {/* Toast Notification System */}
      <ToastContainer 
        toasts={toasts} 
        onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} 
      />
    </div>
  );
}

export default App;
