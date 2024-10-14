import HeaderToolbarItem from "./HeaderToolBarItem";
import LoginButton from "./HeaderLoginButton";
import magnifier from "../../assets/images/header/magnifier.png";
import cart from "../../assets/images/header/cart.png";

interface ToolbarItem {
  id: number;
  src: string;
  alt: string;
}

const toolbarItems: ToolbarItem[] = [
  { id: 1, src: magnifier, alt: "Search" },
  { id: 2, src: cart, alt: "Cart" },
];

function HeaderUserToolbar() {
  return (
    <ul className="header__usertoolbar-list">
      {toolbarItems.map((item) => (
        <HeaderToolbarItem key={item.id} src={item.src} alt={item.alt} />
      ))}
      <LoginButton />
    </ul>
  );
}

export default HeaderUserToolbar;
