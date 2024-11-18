import HomePageShopArticle from "./HomePageShopArticle";
import { userTools } from "./utils/articlesUtils";
import { HomePageShopArticlesProps } from "../shopTypes";
import "./articles.css";

function HomePageShopArticles({ sortedData }: HomePageShopArticlesProps) {
  return (
    <ul className="homepageshop__articles-list">
      {sortedData.map((item) => {
        const isOnSale = item.sale !== undefined && item.sale > 0;
        const newPrice = isOnSale
          ? Number(
              (item.price - (item.price * (item.sale as number)) / 100).toFixed(
                2
              )
            )
          : item.price;

        return (
          <HomePageShopArticle
            key={item.id}
            isOnSale={isOnSale}
            newPrice={newPrice}
            item={item}
            userTools={userTools}
          />
        );
      })}
    </ul>
  );
}

export default HomePageShopArticles;
