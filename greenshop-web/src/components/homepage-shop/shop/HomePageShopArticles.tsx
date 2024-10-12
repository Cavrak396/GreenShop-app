import { FakeDataTypes } from "./fakedata";
import Heart from "../../../assets/images/shop/shopingHeart.svg";
import Cart from "../../../assets/images/shop/shoppingCart.svg";
import "../homepageshop.css";

interface HomePageShopArticlesProps {
  sortedData: FakeDataTypes[];
}

interface UserToolsType {
  src: string;
  id: number;
  alt: string;
  className: string;
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
        const isOnSale = item.sale !== null && item.sale > 0;
        const newPrice = isOnSale
          ? Number(
              (item.price - (item.price * (item.sale as number)) / 100).toFixed(
                2
              )
            )
          : item.price;

        return (
          <li className="homepageshop__article-item" key={item.id}>
            {isOnSale && (
              <span className="homepageshop__article-sale">
                {item.sale}% OFF
              </span>
            )}
            <img
              src={item.src}
              className="homepageshop__article-image"
              alt={item.label}
            />
            <div className="homepageshop__article-usertools">
              {userTools.map((item) => {
                return (
                  <img
                    key={item.id}
                    src={item.src}
                    alt={item.alt}
                    className={item.className}
                  />
                );
              })}
            </div>
            <span className="homepageshop__article-name">{item.label}</span>
            <div className="homepageshop__price-information">
              {isOnSale && (
                <span className="homepageshop__article-newprice">
                  ${newPrice}
                </span>
              )}
              <span
                className={`homepageshop__article-price ${
                  isOnSale ? "homepageshop__article-price--oldprice" : ""
                }`}
              >
                ${item.price}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default HomePageShopArticles;
