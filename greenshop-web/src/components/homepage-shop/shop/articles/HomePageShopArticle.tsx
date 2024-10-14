import { FakeDataTypes } from "../fakedata";
import { UserToolsType } from "../shopTypes";

interface HomePageShopArticleProps {
  isOnSale: boolean;
  newPrice: number;
  item: FakeDataTypes;
  userTools: UserToolsType[];
}

const HomePageShopArticle: React.FC<HomePageShopArticleProps> = ({
  isOnSale,
  newPrice,
  item,
  userTools,
}) => {
  return (
    <li className="homepageshop__article-item" key={item.id}>
      {isOnSale && (
        <span className="homepageshop__article-sale">{item.sale}% OFF</span>
      )}
      <img
        src={item.src}
        className="homepageshop__article-image"
        alt={item.label}
      />
      <div className="homepageshop__article-usertools">
        {userTools.map((tool) => (
          <img
            key={tool.id}
            src={tool.src}
            alt={tool.alt}
            className={tool.className}
          />
        ))}
      </div>
      <span className="homepageshop__article-name">{item.label}</span>
      <div className="homepageshop__price-information">
        {isOnSale && (
          <span className="homepageshop__article-newprice">${newPrice}</span>
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
};

export default HomePageShopArticle;
