import { HeaderNavItemProps } from "./types/headerTypes";

function HeaderNavItem({
  id,
  label,
  activeLink,
  handleLinkClick,
}: HeaderNavItemProps) {
  return (
    <li className="header__navigation-item" key={id}>
      <a
        className={`header__navigation-link ${
          activeLink === id ? "header__navigation-link--activated" : ""
        }`}
        onClick={() => handleLinkClick(id)}
      >
        {label}
      </a>
    </li>
  );
}

export default HeaderNavItem;
