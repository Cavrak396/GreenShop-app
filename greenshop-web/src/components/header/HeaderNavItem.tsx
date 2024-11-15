import { HeaderNavItemProps } from "./types/headerTypes";
import { useNavigate } from "react-router-dom";

function HeaderNavItem({
  id,
  label,
  activeLink,
  handleLinkClick,
}: HeaderNavItemProps) {
  const navigate = useNavigate();

  function handleNavigateClick(event: React.MouseEvent) {
    event.preventDefault();
    handleLinkClick(id);

    switch (label) {
      case "Home":
        navigate("/");
        break;
      case "Devs":
        navigate("/devs");
        break;
    }
  }

  return (
    <li className="header__navigation-item" key={id}>
      <a
        className={`header__navigation-link ${
          activeLink === id ? "header__navigation-link--activated" : ""
        }`}
        onClick={handleNavigateClick}
      >
        {label}
      </a>
    </li>
  );
}

export default HeaderNavItem;
