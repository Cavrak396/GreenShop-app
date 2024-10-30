import { useState } from "react";
import Title from "../../../reusable/Title";
import HomePagePriceRange from "./HomePagePriceRange";
import CategoriesList from "../../../reusable/Categories/CategoriesList";
import HomePageAdvertisement from "./HomePageAdvertisement";
import { categories, categoriesSize } from "./utils/categories";
import "./usertoolbox.css";

function HomePageToolbox() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  return (
    <div className="homepageshop__toolbox">
      <Title className="homepageshop__categories-title small-title">
        Categories
      </Title>
      <CategoriesList
        categories={categories}
        activeCategory={activeCategoryId}
        onCategoryClick={setActiveCategoryId}
      />
      <Title className="homepageshop__categories-title small-title">
        Price Range
      </Title>
      <HomePagePriceRange />
      <Title className="homepageshop__categories-title small-title">Size</Title>
      <CategoriesList
        categories={categoriesSize}
        activeCategory={activeCategoryId}
        onCategoryClick={setActiveCategoryId}
      />
      <HomePageAdvertisement />
    </div>
  );
}

export default HomePageToolbox;
