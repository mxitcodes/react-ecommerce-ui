import { categories } from "../data/products";
import "./CategoryBar.css";

function CategoryBar({ onCategorySelect }) {
  return (
    <section className="category-bar" id="category-bar">
      <div className="category-bar__inner">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-bar__item"
            id={`category-${cat.id}`}
            onClick={() => onCategorySelect(cat.name)}
            style={{cursor: 'pointer'}}
          >
            <div
              className="category-bar__icon"
              style={{
                background: `${cat.color}15`,
                border: `2px solid ${cat.color}30`,
              }}
            >
              <span className="category-bar__emoji">{cat.icon}</span>
            </div>
            <span className="category-bar__name">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryBar;
