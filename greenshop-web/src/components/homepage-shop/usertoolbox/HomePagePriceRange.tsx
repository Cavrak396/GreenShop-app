import { useState, useCallback } from "react";
import RangeInput from "../../../reusable/inputs/RangeInput";
import Button from "../../button/Button";
import "./usertoolbox.css";

const MIN_PRICE = 0;
const MAX_PRICE = 300;

function HomePagePriceRange() {
  const [value, setValue] = useState<number>(0);

  const handleChange = useCallback((newValue: number) => {
    setValue(newValue);
  }, []);

  return (
    <form className="homepageshop__price-form">
      <RangeInput
        className="homepageshop__price-range range-input"
        min={MIN_PRICE}
        max={MAX_PRICE}
        value={value}
        onChange={handleChange}
      />
      <div className="homepageshop__price-info">
        <span>Price: </span>
        <span className="homepageshop__price-prices">$0-${value}</span>
      </div>
      <Button className="homepageshop__price-button button">Filter</Button>
    </form>
  );
}

export default HomePagePriceRange;
