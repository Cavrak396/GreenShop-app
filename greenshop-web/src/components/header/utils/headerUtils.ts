import { NavigationItem } from "../types/headerTypes";
import { ToolbarItem } from "../types/headerTypes";
import magnifier from "../../../assets/images/reusable/magnifier.svg";
import cart from "../../../assets/images/header/cart.svg";

export const navigationList: NavigationItem[] = [
  { id: 1, label: "Home" },
  { id: 2, label: "Devs" },
];

export const toolbarItems: ToolbarItem[] = [
  { id: 1, src: magnifier, alt: "Search" },
  { id: 2, src: cart, alt: "Cart" },
];