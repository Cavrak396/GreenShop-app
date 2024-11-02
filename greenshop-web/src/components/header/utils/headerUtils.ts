import { NavigationItem } from "../types/headerTypes";
import { ToolbarItem } from "../types/headerTypes";
import magnifier from "../../../assets/images/header/magnifier.png";
import cart from "../../../assets/images/header/cart.png";

export const navigationList: NavigationItem[] = [
  { id: 1, label: "Home" },
  { id: 2, label: "Shop" },
  { id: 3, label: "Plant Care" },
  { id: 4, label: "Blogs" },
];

export const toolbarItems: ToolbarItem[] = [
  { id: 1, src: magnifier, alt: "Search" },
  { id: 2, src: cart, alt: "Cart" },
];
