import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userBarItemType } from "./types/userBarTypes";
import Portal from "../../reusable/Portal/Portal";
import Cart from "../cart/Cart";

function UserBarItem({ item, isActive, setActiveId }: userBarItemType) {
  const navigate = useNavigate();
  const [isAppear, setIsAppear] = useState(false);

  function handleNavigation() {
    setActiveId(item.id);
    if (item.alt === "cart") {
      setIsAppear(true);
      navigate("/");
    } else if (item.path) {
      navigate(item.path);
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    if (!isAppear && item.alt === "cart" && isActive && item.id !== 1) {
      setActiveId(1);
    }
  }, [isAppear, item.alt, isActive, item.id, setActiveId]);

  return (
    <>
      <li
        onClick={handleNavigation}
        className={`userbar__list-item ${isActive ? "activated-page" : ""} ${
          item.specialClass ? "userbar__list-item--lighter" : ""
        }`}
      >
        <img src={item.src} alt={item.alt} className="userbar__list-image" />
      </li>

      {isAppear && (
        <Portal setIsAppear={setIsAppear}>
          <Cart />
        </Portal>
      )}
    </>
  );
}

export default memo(UserBarItem);
