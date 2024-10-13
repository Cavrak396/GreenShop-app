import { useState } from "react";
import SmallTitle from "../../../reusable/SmallTitle";
import HomePagePriceRange from "./HomePagePriceRange";
import CategoriesList from "../../../reusable/CategoriesList";
import HomePageAdvertisement from "./HomePageAdvertisement";
import { categories, categoriesSize } from "./utils/categories";
import "./usertoolbox.css";

function HomePageToolbox() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  return (
    <div className="homepageshop__toolbox">
      <SmallTitle className="homepageshop__categories-title small-title">
        Categories
      </SmallTitle>
      <CategoriesList
        categories={categories}
        activeCategory={activeCategoryId}
        onCategoryClick={setActiveCategoryId}
      />
      <SmallTitle className="homepageshop__categories-title small-title">
        Price Range
      </SmallTitle>
      <HomePagePriceRange />
      <SmallTitle className="homepageshop__categories-title small-title">
        Size
      </SmallTitle>
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
