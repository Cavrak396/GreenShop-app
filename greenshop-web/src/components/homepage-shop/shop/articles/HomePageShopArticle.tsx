import HomePageShopImage from "./HomePageShopImage";
import HomePageShopUsertools from "./HomePageShopUsertools";
import HomePageShopPrice from "./HomePageShopPrice";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useCart } from "../../../../context/CartContext";
import { HomePageShopArticleProps, ProductType } from "../../types/shopTypes";
import HomePageShopSale from "./HomePageShopSale";
import { CartItemTypes } from "../../../cart/types/cartTypes";
import { useUser } from "../../../../context/AuthContext";
import { usePlants } from "../../../../context/PlantsContext";

function HomePageShopArticle({
  isOnSale,
  newPrice,
  totalSalePercent,
  item,
  userTools,
}: HomePageShopArticleProps) {
  const { addItemToCart } = useCart();
  const navigate = useNavigate();
  const { token } = useUser();
  const { getShopImage } = usePlants();

  const addingItemsToCart = useCallback(
    (product: ProductType) => {
      const dateAdded = new Date();

      const cartItem: CartItemTypes = {
        id: product.plantId,
        label: product.name,
        price: product.price,
        sale: product.sale_Percent,
        privateSale: product.sale_Percent_Private,
        src: getShopImage(item.image),
        alt: product.name,
        dateAdded,
      };
      console.log(product);
      addItemToCart(cartItem, 1);
    },
    [addItemToCart, token]
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
        price={item.price}
      />
    </li>
  );
}

export default HomePageShopArticle;