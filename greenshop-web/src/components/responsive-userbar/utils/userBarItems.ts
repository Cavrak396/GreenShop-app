import home from "../../../assets/images/responsive-userbar/Home.svg";
import developer from "../../../assets/images/responsive-userbar/coding.svg";
import cart from "../../../assets/images/responsive-userbar/Shop.svg";
import user from "../../../assets/images/responsive-userbar/User.svg";
import { userBarTypes } from "../types/userBarTypes";

export const userBarItems: userBarTypes[] = [
  { id: 1, alt: "home page image", src: home, specialClass: true },
  { id: 2, alt: "developer info image", src: developer, specialClass: true },
  { id: 3, alt: "cart image", src: cart, specialClass: false },
  { id: 4, alt: "user account image", src: user, specialClass: false },
];
