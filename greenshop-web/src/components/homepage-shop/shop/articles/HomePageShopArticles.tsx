import { FakeDataTypes } from "../fakedata";
import Heart from "../../../../assets/images/shop/shopingHeart.svg";
import Cart from "../../../../assets/images/shop/shoppingCart.svg";
import HomePageShopArticle from "./HomePageShopArticle";
import { UserToolsType } from "../shopTypes";
import "./articles.css";

interface HomePageShopArticlesProps {
  sortedData: FakeDataTypes[];
}

const userTools: UserToolsType[] = [
  {
    src: Cart,
    id: 1,
    alt: "user cart",
    className: "homepageshop__article-cart",
  },
  {
    src: Heart,
    id: 2,
    alt: "user heart",
    className: "homepageshop__article-heart",
  },
];

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
