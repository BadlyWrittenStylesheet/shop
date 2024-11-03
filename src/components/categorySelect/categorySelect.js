import "./categorySelect.scss";

const CategorySelect = ({ categoryKit }) => {
  const {categories, selectedCategory, selectCategory } = categoryKit;
  return (
    <div className="categories container">
      {categories.map((category, index) => (
        <button
          key={index}
          className={selectedCategory === category ? "active" : ""}
          onClick={() => selectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelect;
