import { deals } from "../data/products";
import "./DealsSection.css";

function DealsSection() {
  return (
    <section className="deals" id="deals-section">
      <div className="deals__inner">
        <div className="deals__header">
          <h2 className="deals__title">
            <span className="deals__title-icon">⚡</span>
            Today's Best Deals
          </h2>
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
