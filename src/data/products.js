// Product data stored as array of objects
const products = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 29999,
    originalPrice: 34990,
    discount: 14,
    rating: 4.5,
    reviews: 12847,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    category: "Electronics",
    badge: "Best Seller",
    description: "Industry-leading noise cancellation optimized to you. Magnificent sound, engineered to perfection. Crystal clear hands-free calling and up to 30 hours of battery life with quick charging."
  },
  {
    id: 2,
    name: "Apple iPhone 15 Pro Max 256GB",
    price: 149900,
    originalPrice: 159900,
    discount: 6,
    rating: 4.7,
    reviews: 34521,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop",
    category: "Mobiles",
    badge: "Top Rated",
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever. Experience the ultimate Pro performance."
  },
  {
    id: 3,
    name: "Nike Air Max 270 Running Shoes",
    price: 8995,
    originalPrice: 13995,
    discount: 36,
    rating: 4.3,
    reviews: 8765,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    category: "Fashion",
    badge: "Deal of the Day",
    description: "Boasting the first-ever Max Air unit created specifically for Nike Sportswear, the Nike Air Max 270 delivers visible air under every step. Updated for modern comfort."
  },
  {
    id: 4,
    name: "Samsung 55\" Crystal 4K UHD Smart TV",
    price: 42990,
    originalPrice: 64900,
    discount: 34,
    rating: 4.4,
    reviews: 19234,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop",
    category: "Electronics",
    badge: "Limited Deal",
    description: "Step up to the world of Crystal UHD. Experience vibrant colors and sharp details with the Crystal Processor 4K. Includes built-in voice assistants and a sleek, boundless design."
  },
  {
    id: 5,
    name: "Fossil Gen 6 Smartwatch",
    price: 14995,
    originalPrice: 24995,
    discount: 40,
    rating: 4.1,
    reviews: 5623,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    category: "Watches",
    badge: "Lightning Deal",
    description: "Powered with Wear OS by Google. Faster performance, lower power consumption, and a brighter display. Track your health, receive notifications, and stay connected on the go."
  },
  {
    id: 6,
    name: "Canon EOS R50 Mirrorless Camera",
    price: 67990,
    originalPrice: 79990,
    discount: 15,
    rating: 4.6,
    reviews: 3456,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop",
    category: "Electronics",
    badge: "New Launch",
    description: "Make your content stand out with this compact mirrorless camera. Features a 24.2MP APS-C sensor, 4K video recording, and advanced Dual Pixel CMOS AF II for perfect focus."
  },
  {
    id: 7,
    name: "Apple MacBook Air M2 Chip 256GB",
    price: 99990,
    originalPrice: 119900,
    discount: 17,
    rating: 4.8,
    reviews: 27891,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
    category: "Laptops",
    badge: "Best Seller",
    description: "Supercharged by M2. An impossibly thin design meets next-generation performance. Features a beautiful Liquid Retina display, 1080p FaceTime HD camera, and all-day battery life."
  },
  {
    id: 8,
    name: "JBL Charge 5 Bluetooth Speaker",
    price: 12999,
    originalPrice: 17999,
    discount: 28,
    rating: 4.4,
    reviews: 14567,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
    category: "Electronics",
    badge: "Popular",
    description: "Take the amazing power of JBL Pro Sound with you. The Charge 5 features an optimized long excursion driver, a separate tweeter, and dual pumping JBL bass radiators. IP67 waterproof."
  },
  {
    id: 9,
    name: "Ray-Ban Aviator Classic Sunglasses",
    price: 7490,
    originalPrice: 11990,
    discount: 38,
    rating: 4.2,
    reviews: 9876,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop",
    category: "Fashion",
    badge: "Trending",
    description: "Currently one of the most iconic sunglass models in the world. Ray-Ban Aviator Classic sunglasses were originally designed for U.S. aviators in 1937."
  },
  {
  id: 12,
  name: "PlayStation 5 Console",
  price: 54999,
  originalPrice: 59999,
  discount: 8,
  rating: 4.9,
  reviews: 22451,
  image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
  category: "Gaming",
  badge: "Hot Deal",
  description:
    "Next-generation PlayStation 5 console with ultra-fast SSD, ray tracing, and immersive gaming experience."
  },
  {
    id: 11,
    name: "Adidas Ultraboost Light Sneakers",
    price: 11999,
    originalPrice: 16999,
    discount: 29,
    rating: 4.5,
    reviews: 6543,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=300&fit=crop",
    category: "Fashion",
    badge: "Trending",
    description: "Experience epic energy with the new Ultraboost Light, our lightest ever. The magic lies in the Light BOOST midsole, providing superior cushioning and responsiveness."
  },
  {
    id: 12,
    name: "Kindle Paperwhite 16GB E-Reader",
    price: 13999,
    originalPrice: 16999,
    discount: 18,
    rating: 4.6,
    reviews: 21098,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop",
    category: "Electronics",
    badge: "Amazon Choice",
    description: "Now with a 6.8\" display and thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns. Purpose-built for reading with a flush-front design."
  },
];

export const categories = [
  { id: 1, name: "Mobiles", icon: "📱", color: "#FF6B6B" },
  { id: 2, name: "Electronics", icon: "💻", color: "#4ECDC4" },
  { id: 3, name: "Fashion", icon: "👗", color: "#FFE66D" },
  { id: 4, name: "Home", icon: "🏠", color: "#A8E6CF" },
  { id: 5, name: "Appliances", icon: "🔌", color: "#FF8B94" },
  { id: 6, name: "Books", icon: "📚", color: "#B5B8FF" },
  { id: 7, name: "Toys", icon: "🧸", color: "#FFDAC1" },
  { id: 8, name: "Sports", icon: "⚽", color: "#98D8C8" },
];

export const banners = [
  {
    id: 1,
    title: "Mega Electronics Sale",
    subtitle: "Up to 70% Off on Top Brands",
    cta: "Shop Now",
    gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    accent: "#6C63FF",
  },
  {
    id: 2,
    title: "Fashion Fiesta",
    subtitle: "New Arrivals | Min 40% Off",
    cta: "Explore Trends",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    accent: "#FF6B6B",
  },
  {
    id: 3,
    title: "Summer Specials",
    subtitle: "Cool Deals on Hot Days",
    cta: "Grab Deals",
    gradient: "linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #2d4059 100%)",
    accent: "#4ECDC4",
  },
];

export const deals = [
  { id: 1, title: "Smartphones", discount: "Up to 40% off", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
  { id: 2, title: "Laptops", discount: "Up to 35% off", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop" },
  { id: 3, title: "Headphones", discount: "Min 50% off", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop" },
  { id: 4, title: "Cameras", discount: "From ₹29,999", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop" },
];

export default products;
