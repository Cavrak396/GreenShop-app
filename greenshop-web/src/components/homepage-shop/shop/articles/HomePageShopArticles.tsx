import HomePageShopArticle from "./HomePageShopArticle";
import { userTools } from "./utils/articlesUtils";
import { HomePageShopArticlesProps } from "../../types/shopTypes";
import { usePrice } from "../../../../customHooks/usePriceCalculator";
import "./articles.css";

function HomePageShopArticles({ sortedData }: HomePageShopArticlesProps) {
  const { getPrice } = usePrice();

  return (
    <ul className="homepageshop__articles-list">
      {sortedData.map((item) => {
        console.log(item);
        const newPrice = getPrice(item);
        const salePercent = item.sale_Percent_Private ?? item.sale ?? 0;

        const oldPrice =
          salePercent > 0
            ? Number((newPrice * (1 + salePercent / 100)).toFixed(2))
            : newPrice;

        const isOnSale = salePercent > 0;

        return (
          <HomePageShopArticle
            key={item.plantId}
            isOnSale={isOnSale}
            newPrice={newPrice}
            totalSalePercent={salePercent}
            item={item}
            userTools={userTools}
            isLoggedIn={!!salePercent}
            oldPrice={oldPrice}
          />
        );
      })}
    </ul>
  );
}

export default HomePageShopArticles;
