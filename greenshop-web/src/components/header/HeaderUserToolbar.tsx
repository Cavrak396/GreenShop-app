import HeaderToolbarItem from "./HeaderToolBarItem";
import HeaderSearchBar from "./HeaderSearchBar";
import LoginButton from "./HeaderLoginButton";
import { useState } from "react";
import { toolbarItems } from "./utils/headerUtils";

function HeaderUserToolbar() {
  const [isAppear, setIsAppear] = useState<boolean>(false);

  return (
    <ul className="header__usertoolbar-list">
      <HeaderSearchBar isAppear={isAppear} />
      {toolbarItems.map((item) => (
        <HeaderToolbarItem
          key={item.id}
          src={item.src}
          alt={item.alt}
          setIsAppear={setIsAppear}
        />
      ))}
      <LoginButton />
    </ul>
  );
}

export default HeaderUserToolbar;
