import HomePageShopArticle from "./HomePageShopArticle";
import { userTools } from "./utils/articlesUtils";
import { HomePageShopArticlesProps } from "../../types/shopTypes";
import "./articles.css";

function HomePageShopArticles({ sortedData }: HomePageShopArticlesProps) {
  return (
    <ul className="homepageshop__articles-list">
      {sortedData.map((item) => {
        const publicSalePercent = item.sale_Percent || 0;

        const isOnSale = publicSalePercent > 0;

        const newPrice = isOnSale
          ? Number(
              (item.price - (item.price * publicSalePercent) / 100).toFixed(2)
            )
          : item.price;

        return (
          <HomePageShopArticle
            key={item.plantId}
            isOnSale={isOnSale}
            newPrice={newPrice}
            totalSalePercent={publicSalePercent}
            item={item}
            userTools={userTools}
          />
        );
      })}
    </ul>
  );
}

export default HomePageShopArticles;