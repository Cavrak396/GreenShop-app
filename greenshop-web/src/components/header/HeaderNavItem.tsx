import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { HeaderNavItemProps } from "./types/headerTypes";
import Portal from "../../reusable/Portal/Portal";
import UserAccount from "../../user-account/UserAccount";

function HeaderNavItem({
  id,
  label,
  activeLink,
  handleLinkClick,
}: HeaderNavItemProps) {
  const navigate = useNavigate();
  const [isAppear, setIsAppear] = useState<boolean>(false);

  const handleNavigation = (label: string) => {
    switch (label) {
      case "Home":
        navigate("/");
        break;
      case "Devs":
        navigate("/developers");
        break;
      case "Blogs":
        setIsAppear(true); // test
        break;
      default:
        break;
    }
  };

  return (
    <>
      <li className="header__navigation-item" key={id}>
        <a
          className={`header__navigation-link ${
            activeLink === id ? "header__navigation-link--activated" : ""
          }`}
          onClick={() => {
            handleLinkClick(id);
            handleNavigation(label);
          }}
        >
          {label}
        </a>
      </li>
      {isAppear && (
        <Portal setIsAppear={setIsAppear}>
          <UserAccount /> 
          {/* test */}
        </Portal>
      )}
    </>
  );
}

export default HeaderNavItem;
