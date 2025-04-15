import { useNavigate } from "react-router-dom";
import { HeaderNavItemProps } from "./types/headerTypes";

function HeaderNavItem({
  id,
  label,
  activeLink,
  handleLinkClick,
}: HeaderNavItemProps) {
  const navigate = useNavigate();

  const handleNavigation = (label: string) => {
    switch (label) {
      case "Home":
        navigate("/");
        break;
      case "Devs":
        navigate("/developers");
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    handleLinkClick(id);
    handleNavigation(label);
  };

  return (
    <li className="header__navigation-item">
      <a
        className={`header__navigation-link ${
          activeLink === id ? "header__navigation-link--activated" : ""
        }`}
        onClick={handleClick}
        aria-label={label}
        aria-current={activeLink === id ? "page" : undefined}
      >
        {label}
      </a>
    </li>
  );
}

export default HeaderNavItem;
