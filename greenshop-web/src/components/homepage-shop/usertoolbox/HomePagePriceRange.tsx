import { useState, useCallback, useEffect } from "react";
import RangeInput from "../../../reusable/inputs/RangeInput";
import Button from "../../../reusable/button/Button";
import "./usertoolbox.css";
import { usePlants } from "../../../context/PlantsContext";

const MIN_PRICE = 0;
const MAX_PRICE = 300;

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
      setMinPrice(Math.min(newMin, maxPrice));
    },
    [maxPrice]
  );

  const handleMaxChange = useCallback(
    (newMax: number) => {
      setMaxPrice(Math.max(newMax, minPrice));
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
    <form className="homepageshop__price-form" onSubmit={handleFilterSubmit}>
      <RangeInput
        className="homepageshop__price-range range-input"
        min={MIN_PRICE}
        max={MAX_PRICE}
        value={minPrice}
        onChange={handleMinChange}
      />
      <RangeInput
        className="homepageshop__price-range range-input"
        min={MIN_PRICE}
        max={MAX_PRICE}
        value={maxPrice}
        onChange={handleMaxChange}
      />
      <div className="homepageshop__price-info">
        <span>Price: </span>
        <span className="homepageshop__price-prices">
          ${minPrice} - ${maxPrice}
        </span>
      </div>
      <Button className="homepageshop__price-button button" type="submit">
        Filter
      </Button>
    </form>
  );
}

export default HomePagePriceRange;
