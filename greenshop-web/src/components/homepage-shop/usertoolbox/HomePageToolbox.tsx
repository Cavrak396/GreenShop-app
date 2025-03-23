import Title from "../../../reusable/titles/Title";
import HomePagePriceRange from "./HomePagePriceRange";
import CategoriesList from "../../../reusable/Categories/CategoriesList";
import HomePageAdvertisement from "./HomePageAdvertisement";
import { categories, categoriesSize } from "./utils/categories";
import { usePlants } from "../../../context/PlantsContext";
import "./usertoolbox.css";

function HomePageToolbox() {
  const { filters, setFilters } = usePlants();

  const handleCategoryClick = (label: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: label,
    }));
  };

  const handleSizeClick = (label: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      size: label,
    }));
  };

  return (
    <div className="homepageshop__toolbox">
      <Title className="homepageshop__categories-title small-title">
        Categories
      </Title>
      <CategoriesList
        categories={categories}
        activeCategory={filters.category}
        onCategoryClick={handleCategoryClick}
        isSizeCategory={false}
      />
      <Title className="homepageshop__categories-title small-title">
        Price Range
      </Title>
      <HomePagePriceRange />
      <Title className="homepageshop__categories-title small-title">Size</Title>
      <CategoriesList
        categories={categoriesSize}
        activeCategory={filters.size}
        onCategoryClick={handleSizeClick}
        isSizeCategory={true}
      />
      <HomePageAdvertisement />
    </div>
  );
}

export default HomePageToolbox;
