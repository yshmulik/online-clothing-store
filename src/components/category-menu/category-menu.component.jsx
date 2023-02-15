import CategoryItem from "../category-itm/category-item.component";
import "./category-menu.styles.scss";
export default function CategoryMenu({ categories }) {
  return (
    <div className="category-menu">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
