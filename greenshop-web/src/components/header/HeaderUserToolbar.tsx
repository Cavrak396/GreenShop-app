import HeaderToolbarItem from "./HeaderToolBarItem";
import HeaderSearchBar from "./HeaderSearchBar";
import LoginButton from "./HeaderLoginButton";
import HeaderAccount from "./HeaderAccount";
import { useState } from "react";
import { toolbarItems } from "./utils/headerUtils";
import { useUser } from "../../context/AuthContext";

function HeaderUserToolbar() {
  const { token } = useUser();
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
      {token ? (
        <HeaderAccount />
      ) : (
        <LoginButton />
      )}
    </ul>
  );
}

export default HeaderUserToolbar;
