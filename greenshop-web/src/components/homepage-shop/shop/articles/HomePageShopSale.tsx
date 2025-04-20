import { HomePageShopSaleProps } from "../../types/shopTypes";

function HomePageShopSale({ sale }: HomePageShopSaleProps) {
  return <span className="homepageshop__article-sale">{sale}% OFF</span>;
}

export default HomePageShopSale;
