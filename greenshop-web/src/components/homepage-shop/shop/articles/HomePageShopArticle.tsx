import HomePageShopImage from "./HomePageShopImage";
import HomePageShopUsertools from "./HomePageShopUsertools";
import HomePageShopPrice from "./HomePageShopPrice";
import HomePageShopSale from "./HomePageShopSale";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useCart } from "../../../../context/CartContext";
import { HomePageShopArticleProps, ProductType } from "../../types/shopTypes";
import { CartItemTypes } from "../../../cart/types/cartTypes";
import { useUser } from "../../../../context/AuthContext";
import { usePlants } from "../../../../context/PlantsContext";
import { createCartItem } from "../../../details/utils/detailsUtils";

function HomePageShopArticle({
  isOnSale,
  newPrice,
  totalSalePercent,
  item,
  userTools,
  oldPrice,
}: HomePageShopArticleProps) {
  const { addItemToCart } = useCart();
  const navigate = useNavigate();
  const { token } = useUser();
  const { getShopImage } = usePlants();

  const addingItemsToCart = useCallback(
    (product: ProductType) => {
      const dateAdded = new Date();
      const cartItem: CartItemTypes = createCartItem(
        product,
        getShopImage,
        dateAdded
      );

      addItemToCart(cartItem, 1);
    },
    [addItemToCart, token, getShopImage]
  );

  function goToDetailsPage() {
    navigate(`/details/${item.plantId}`);
  }

  return (
    <li className="homepageshop__article-item">
      {isOnSale && <HomePageShopSale sale={totalSalePercent} />}
      <HomePageShopImage
        src={getShopImage(item.image)}
        alt={item.name}
        onClick={goToDetailsPage}
      />
      <HomePageShopUsertools
        userTools={userTools}
        addItemToCart={addingItemsToCart}
        item={item}
      />
      <span className="homepageshop__article-name">{item.name}</span>
      <HomePageShopPrice
        isOnSale={isOnSale}
        newPrice={newPrice}
        price={oldPrice}
      />
    </li>
  );
}

export default HomePageShopArticle;
