import HomePageShopImage from "./HomePageShopImage";
import HomePageShopUsertools from "./HomePageShopUsertools";
import HomePageShopPrice from "./HomePageShopPrice";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { FakeDataTypes } from "../fakedata";
import { useCart } from "../../../../context/CartContext";
import { HomePageShopArticleProps } from "../shopTypes";
import HomePageShopSale from "./HomePageShopSale";

function HomePageShopArticle({
  isOnSale,
  newPrice,
  item,
  userTools,
}: HomePageShopArticleProps) {
  const { addItemToCart } = useCart();
  const navigate = useNavigate();

  const addingItemsToCart = useCallback(
    (item: FakeDataTypes) => {
      const dateAdded = new Date();
      const itemWithDate = {
        ...item,
        dateAdded,
        alt: item.label,
        quantity: 1,
      };
      addItemToCart(itemWithDate, 1);
    },
    [addItemToCart]
  );

  function goToDetailsPage() {
    navigate(`/details/${item.label}`);
  }

  return (
    <li className="homepageshop__article-item" key={item.id}>
      {isOnSale && <HomePageShopSale sale={item.sale} />}
      <HomePageShopImage
        src={item.src}
        alt={item.label}
        onClick={goToDetailsPage}
      />
      <HomePageShopUsertools
        userTools={userTools}
        addItemToCart={addingItemsToCart}
        item={item}
      />
      <span className="homepageshop__article-name">{item.label}</span>
      <HomePageShopPrice
        isOnSale={isOnSale}
        newPrice={newPrice}
        price={item.price}
      />
    </li>
  );
}

export default HomePageShopArticle;
