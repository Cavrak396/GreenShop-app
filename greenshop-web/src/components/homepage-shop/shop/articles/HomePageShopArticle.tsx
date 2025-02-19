import HomePageShopImage from "./HomePageShopImage";
import HomePageShopUsertools from "./HomePageShopUsertools";
import HomePageShopPrice from "./HomePageShopPrice";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useCart } from "../../../../context/CartContext";
import { HomePageShopArticleProps, ProductType } from "../shopTypes";
import HomePageShopSale from "./HomePageShopSale";
import { CartItem } from "../../../cart/types/CartTypes";
import ProductImage from "../../../../assets/images/banner/banner-image.png";

function HomePageShopArticle({
  isOnSale,
  newPrice,
  totalSalePercent,
  item,
  userTools,
}: HomePageShopArticleProps) {
  const { addItemToCart } = useCart();
  const navigate = useNavigate();

  const addingItemsToCart = useCallback(
    (item: ProductType) => {
      const dateAdded = new Date();
      const cartItem: CartItem = {
        id: item.plantId,
        label: item.name,
        price: item.price,
        sale: item.sale_Percent,
        src: item.image,
        alt: item.name,
        dateAdded,
      };
      addItemToCart(cartItem, 1);
    },
    [addItemToCart]
  );

  function goToDetailsPage() {
    navigate(`/details/${item.plantId}`);
  }

  return (
    <li className="homepageshop__article-item">
      {isOnSale && <HomePageShopSale sale={totalSalePercent} />}
      <HomePageShopImage
        src={ProductImage}
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