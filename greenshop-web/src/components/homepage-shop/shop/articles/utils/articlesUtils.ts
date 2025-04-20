import Heart from "../../../../../assets/images/shop/shopingHeart.svg";
import Cart from "../../../../../assets/images/shop/shoppingCart.svg";
import { UserToolsType } from "../../../types/shopTypes";

export const userTools: UserToolsType[] = [
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