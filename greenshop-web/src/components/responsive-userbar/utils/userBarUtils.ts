import home from "../../../assets/images/responsive-userbar/Home.svg";
import developer from "../../../assets/images/responsive-userbar/coding.svg";
import cart from "../../../assets/images/responsive-userbar/Shop.svg";
import user from "../../../assets/images/responsive-userbar/User.svg";
import { navigationTypes, userBarTypes } from "../types/userBarTypes";

export const userBarItems: userBarTypes[] = [
  { id: 1, alt: "home page ", src: home, path: "/", specialClass: true },
  {
    id: 2,
    alt: "developers",
    src: developer,
    path: "/developers",
    specialClass: true,
  },
  { id: 3, alt: "cart", src: cart, specialClass: false },
  {
    id: 4,
    alt: "user account",
    src: user,
    specialClass: false,
  },
];

export function handleNavigationLogic({
  item,
  setActiveId,
  setActivePortal,
  token,
  navigate
}: navigationTypes) {
  setActiveId(item.id);
  switch (item.alt) {
    case "cart":
      setActivePortal((prev) => (prev === "cart" ? null : "cart"));
      break;
    case "user account":
      if (token) {
        setActivePortal((prev) =>
          prev === "userAccount" ? null : "userAccount"
        );
      } else {
        setActivePortal((prev) =>
          prev === "authContent" ? null : "authContent"
        );
      }
      break;
    default:
      if (item.path) {
        navigate(item.path);
      } else {
        navigate("/");
      }
      break;
  }
}