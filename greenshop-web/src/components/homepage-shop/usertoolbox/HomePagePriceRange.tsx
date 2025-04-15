import { useState, useCallback, useEffect } from "react";
import RangeInput from "../../../reusable/inputs/RangeInput";
import Button from "../../../reusable/button/Button";
import {
  MIN_PRICE,
  MAX_PRICE,
  handleMinPriceChange,
  handleMaxPriceChange,
} from "./utils/categories";
import { usePlants } from "../../../context/PlantsContext";
import "./usertoolbox.css";
import AccessibiltyText from "../../../reusable/accessibility-text/AccessibilityText";

function HomePagePriceRange() {
  const { filters, setFilters } = usePlants();
  const [minPrice, setMinPrice] = useState<number>(
    filters.priceMin ?? MIN_PRICE
  );
  const [maxPrice, setMaxPrice] = useState<number>(
    filters.priceMax ?? MAX_PRICE
  );

  useEffect(() => {
    setMinPrice(filters.priceMin ?? MIN_PRICE);
    setMaxPrice(filters.priceMax ?? MAX_PRICE);
  }, [filters]);

  const handleMinChange = useCallback(
    (newMin: number) => {
      setMinPrice(handleMinPriceChange(newMin, maxPrice));
    },
    [maxPrice]
  );

  const handleMaxChange = useCallback(
    (newMax: number) => {
      setMaxPrice(handleMaxPriceChange(newMax, minPrice));
    },
    [minPrice]
  );

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceMin: minPrice,
      priceMax: maxPrice,
    }));
  };

  return (
    <form
      className="homepageshop__price-form"
      onSubmit={handleFilterSubmit}
      aria-labelledby="price-range-form"
    >
      <AccessibiltyText
        title="price range form"
        text="use this to filter price for products"
        id="price-range-form"
      />

      <RangeInput
        className="homepageshop__price-range range-input"
        min={MIN_PRICE}
        max={MAX_PRICE}
        value={minPrice}
        aria-label="Minimalna cena"
        onChange={handleMinChange}
      />
      <RangeInput
        className="homepageshop__price-range range-input"
        min={MIN_PRICE}
        max={MAX_PRICE}
        value={maxPrice}
        aria-label="Maksimalna cena"
        onChange={handleMaxChange}
      />

      <div className="homepageshop__price-info" aria-live="polite">
        <span>Price: </span>
        <span className="homepageshop__price-prices">
          ${minPrice} - ${maxPrice}
        </span>
      </div>

      <Button className="homepageshop__price-button button" type="submit">
        Filtriraj
      </Button>
    </form>
  );
}

export default HomePagePriceRange;
