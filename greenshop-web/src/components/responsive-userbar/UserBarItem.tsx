import { memo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { userBarItemType } from "./types/userBarTypes";
import Portal from "../../reusable/portal/Portal";
import Cart from "../cart/Cart";
import UserAccount from "../user-account/UserAccount";
import { useUser } from "../../context/AuthContext";
import AuthContent from "../authorization/AuthContent";
import { userBarItems, handleNavigationLogic } from "./utils/userBarUtils";

function UserBarItem({
  item,
  isActive,
  setActiveId,
  activePortal,
  setActivePortal,
}: userBarItemType) {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useUser();

  function handleNavigation() {
    if (activePortal) {
      setActivePortal(null);
      setTimeout(() => {
        handleNavigationLogic({
          item,
          setActiveId,
          setActivePortal,
          token,
          navigate,
        });
      }, 0);
    } else {
      handleNavigationLogic({
        item,
        setActiveId,
        setActivePortal,
        token,
        navigate,
      });
    }
  }

  useEffect(() => {
    if (!activePortal) {
      const currentPath = location.pathname.slice(1);
      const matchedItem = userBarItems.find(
        (barItem) => barItem.alt === currentPath
      );
      if (matchedItem) {
        setActiveId(matchedItem.id);
      } else {
        setActiveId(1);
      }
    }
  }, [activePortal, location.pathname, setActiveId]);

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

      {activePortal && (
        <Portal setIsAppear={() => setActivePortal(null)}>
          {activePortal === "cart" && <Cart />}
          {token && activePortal === "userAccount" && <UserAccount />}
          {!token && activePortal === "authContent" && <AuthContent />}
        </Portal>
      )}
    </>
  );
}

export default memo(UserBarItem);
