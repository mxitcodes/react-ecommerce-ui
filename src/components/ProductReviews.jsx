import { FiStar } from "react-icons/fi";
import "./ProductReviews.css";

const generateMockReviews = (productId) => {
  const seeds = [
    { name: "Alex Johnson", text: "Absolutely love this product! The quality exceeded my expectations and delivery was super fast.", rating: 5 },
    { name: "Sarah Williams", text: "Great value for the price. It looks exactly like the pictures and functions perfectly.", rating: 4 },
    { name: "Michael Chen", text: "I've been using this daily and it hasn't let me down. The build quality is fantastic.", rating: 5 },
    { name: "Emily Davis", text: "Decent product, but shipping took a bit longer than expected. Overall satisfied.", rating: 4 },
    { name: "Chris Taylor", text: "Not bad, it gets the job done. I wish it had a few more features though.", rating: 3 },
    { name: "Jessica Brown", text: "Best purchase I've made this year! Completely transformed how I do things.", rating: 5 },
  ];

  // Use productId to deterministically pick a subset of reviews
  const reviewCount = (productId % 3) + 2; // 2 to 4 reviews
  const startIndex = productId % seeds.length;
  
  const selectedReviews = [];
  for (let i = 0; i < reviewCount; i++) {
    const seed = seeds[(startIndex + i) % seeds.length];
    selectedReviews.push({
      id: `${productId}-${i}`,
      name: seed.name,
      avatar: `https://i.pravatar.cc/150?u=${productId}${i}a042581f4e29026`,
      rating: seed.rating,
      date: `${(i * 2) + 1} weeks ago`,
      comment: seed.text
    });
  }
  return selectedReviews;
};

function ProductReviews({ productId }) {
  const reviews = generateMockReviews(productId);
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  
  return (
    <div className="product-reviews">
      <div className="product-reviews-header">
        <h3>Customer Reviews</h3>
        <div className="product-reviews-summary">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className={i < Math.round(avgRating) ? "star filled" : "star"} />
            ))}
          </div>
          <span>{avgRating} out of 5 • Based on {reviews.length} reviews</span>
        </div>
      </div>

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <img src={review.avatar} alt={review.name} className="review-avatar" />
              <div className="review-meta">
                <span className="review-name">{review.name}</span>
                <span className="review-date">{review.date}</span>
              </div>
              <div className="review-rating">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={i < review.rating ? "star filled" : "star"} />
                ))}
              </div>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
      
      <button className="write-review-btn">Write a Review</button>
    </div>
  );
}

export default ProductReviews;
