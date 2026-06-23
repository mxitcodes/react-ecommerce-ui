import { useState, useEffect } from "react";
import { deals } from "../data/products";
import "./DealsSection.css";

function DealsSection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 23, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              // Reset to 24 hours
              hours = 23;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => time.toString().padStart(2, "0");

  return (
    <section className="deals" id="deals-section">
      <div className="deals__inner">
        <div className="deals__header">
          <div className="deals__title-group">
            <h2 className="deals__title">
              <span className="deals__title-icon">⚡</span>
              Today's Best Deals
            </h2>
            <div className="deals__timer">
              <span className="deals__timer-label">Ends in:</span>
              <div className="deals__timer-boxes">
                <span className="deals__timer-box">{formatTime(timeLeft.hours)}</span>
                <span className="deals__timer-sep">:</span>
                <span className="deals__timer-box">{formatTime(timeLeft.minutes)}</span>
                <span className="deals__timer-sep">:</span>
                <span className="deals__timer-box">{formatTime(timeLeft.seconds)}</span>
              </div>
            </div>
          </div>
          <a href="#" className="deals__view-all" id="deals-view-all">
            View All Deals →
          </a>
        </div>
        <div className="deals__grid">
          {deals.map((deal) => (
            <div key={deal.id} className="deals__card" id={`deal-card-${deal.id}`}>
              <div className="deals__card-img-wrap">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="deals__card-img"
                  loading="lazy"
                />
              </div>
              <div className="deals__card-info">
                <h3 className="deals__card-title">{deal.title}</h3>
                <span className="deals__card-discount">{deal.discount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DealsSection;
