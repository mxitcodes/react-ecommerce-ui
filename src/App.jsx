import { useState, useCallback } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import CategoryBar from "./components/CategoryBar";
import DealsSection from "./components/DealsSection";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import ProductModal from "./components/ProductModal";
import products from "./data/products";

function App() {
  // State management using useState
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Toast notification utility — defined BEFORE handlers that use it
  const showToastMessage = useCallback((message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
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

  // Cart quantity handlers
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

  // Search handler — filters products by name or category
  const handleSearch = useCallback(
    (query) => {
      if (!query.trim()) {
        setFilteredProducts(products);
        return;
      }
      const lowerQuery = query.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.category.toLowerCase().includes(lowerQuery)
      );
      setFilteredProducts(filtered);

      if (filtered.length === 0) {
        showToastMessage("🔍 No products found. Showing all products.");
        setFilteredProducts(products);
      } else {
        showToastMessage(`🔍 Found ${filtered.length} product(s)`);
      }
    },
    [showToastMessage]
  );

  return (
    <div className="app" id="app-root">
      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onSearch={handleSearch} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      <main>
        <Banner />
        <CategoryBar />
        <DealsSection />
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
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
      />

      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Toast Notification */}
      <div className={`toast ${showToast ? "toast--show" : ""}`} id="toast">
        <span className="toast__icon">🛒</span>
        {toastMessage}
      </div>
    </div>
  );
}

export default App;
