import { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userBarItemType } from "./types/userBarTypes";
import Portal from "../../reusable/Portal/Portal";
import Cart from "../cart/Cart";
import UserAccount from "../user-account/UserAccount";
import { useUser } from "../../context/AuthContext";
import AuthContent from "../authorization/AuthContent";

function UserBarItem({ item, isActive, setActiveId }: userBarItemType) {
  const navigate = useNavigate();
  const [activePortal, setActivePortal] = useState<string | null>(null);
  const { token } = useUser();

  function handleNavigation() {
    setActiveId(item.id);

    if (item.alt === "cart") {
      setActivePortal("cart");
    } else if (item.alt === "user account") {
      if (token) {
        setActivePortal("userAccount");
      } else {
        setActivePortal("authContent");
      }
    } else if (item.path) {
      navigate(item.path);
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    if (!activePortal) {
      setActiveId(1);
    }
  }, [activePortal, setActiveId]);

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
          {activePortal === "userAccount" && <UserAccount />}
          {activePortal === "authContent" && <AuthContent />}
        </Portal>
      )}
    </>
  );
}

export default memo(UserBarItem);