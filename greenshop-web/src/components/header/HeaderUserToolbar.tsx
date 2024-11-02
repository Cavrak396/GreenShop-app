import HeaderToolbarItem from "./HeaderToolBarItem";
import HeaderSearchBar from "./HeaderSearchBar";
import LoginButton from "./HeaderLoginButton";
import magnifier from "../../assets/images/header/magnifier.png";
import cart from "../../assets/images/header/cart.png";
import { useState } from "react";

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
  const [isAppear, setIsAppear] = useState<boolean>(false);

  return (
    <ul className="header__usertoolbar-list">
      <HeaderSearchBar isAppear={isAppear}/>
      {toolbarItems.map((item) => (
        <HeaderToolbarItem key={item.id} src={item.src} alt={item.alt} setIsAppear={setIsAppear}/>
      ))}
      <LoginButton />
    </ul>
  );
}

export default HeaderUserToolbar;
