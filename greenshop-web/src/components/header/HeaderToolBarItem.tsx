import "./header.css";
import Button from "../../reusable/button/Button";
import { ToolbarItemProps } from "./types/headerTypes";
import Portal from "../../reusable/Portal/Portal";
import Cart from "../cart/Cart";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function HeaderToolbarItem({ src, alt, setIsAppear }: ToolbarItemProps) {
  const [isCartAppear, setIsCartAppear] = useState<boolean>(false);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  function handleToolbarClick() {
    if (alt === "Search") {
      setIsAppear((prev) => !prev);
    } else if (alt === "Cart") {
      setIsCartAppear((prev) => !prev);
    }
  }

  return (
    <>
      {(alt !== "Search" || isHomePage) && (
        <li className="header__usertoolbar-item">
          <Button
            className={`header__usertoolbar-button ${
              alt === "Search" ? "header__usertoolbar-button--responsive" : ""
            }`}
            onClick={handleToolbarClick}
          >
            <img src={src} alt={alt} className="header__usertoolbar-image" />
          </Button>
        </li>
      )}

      {isCartAppear && (
        <Portal setIsAppear={setIsCartAppear}>
          <Cart />
        </Portal>
      )}
    </>
  );
}

export default HeaderToolbarItem;
