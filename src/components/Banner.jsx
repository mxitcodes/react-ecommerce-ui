import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { banners } from "../data/products";
import "./Banner.css";

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % banners.length);

  return (
    <section className="banner" id="hero-banner">
      <div className="banner__slider">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`banner__slide ${index === currentSlide ? "banner__slide--active" : ""}`}
            style={{ background: banner.gradient }}
          >
            <div className="banner__content">
              <div className="banner__text-group">
                <span
                  className="banner__tag"
                  style={{
                    background: `${banner.accent}20`,
                    color: banner.accent,
                    borderColor: `${banner.accent}40`,
                  }}
                >
                  🔥 Limited Time Offer
                </span>
                <h2 className="banner__title">{banner.title}</h2>
                <p className="banner__subtitle">{banner.subtitle}</p>
                <button
                  className="banner__cta"
                  id={`banner-cta-${index}`}
                  style={{ background: banner.accent }}
                >
                  {banner.cta}
                  <span className="banner__cta-arrow">→</span>
                </button>
              </div>
              <div className="banner__visual">
                <div
                  className="banner__circle"
                  style={{
                    background: `radial-gradient(circle, ${banner.accent}30 0%, transparent 70%)`,
                  }}
                ></div>
                <div
                  className="banner__circle banner__circle--sm"
                  style={{
                    background: `radial-gradient(circle, ${banner.accent}20 0%, transparent 70%)`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="banner__arrow banner__arrow--left"
        onClick={prevSlide}
        aria-label="Previous slide"
        id="banner-prev"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        className="banner__arrow banner__arrow--right"
        onClick={nextSlide}
        aria-label="Next slide"
        id="banner-next"
      >
        <FiChevronRight size={24} />
      </button>

      <div className="banner__dots">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`banner__dot ${index === currentSlide ? "banner__dot--active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            id={`banner-dot-${index}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Banner;
