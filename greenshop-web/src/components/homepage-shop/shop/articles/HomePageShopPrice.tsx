import { HomePageShopPriceProps } from "../../types/shopTypes";

function HomePageShopPrice({
  isOnSale,
  newPrice,
  price,
}: HomePageShopPriceProps) {
  return (
    <div className="homepageshop__price-information">
      {isOnSale && (
        <span className="homepageshop__article-newprice">${newPrice}</span>
      )}
      <span
        className={`homepageshop__article-price ${
          isOnSale ? "homepageshop__article-price--oldprice" : ""
        }`}
      >
        ${price}
      </span>
    </div>
  );
}

export default HomePageShopPrice;
