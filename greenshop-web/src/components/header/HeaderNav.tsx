import { useState, useCallback } from "react";
import HeaderNavItem from "./HeaderNavItem";
import { navigationList } from "./utils/headerUtils";

function HeaderNav() {
  const [activeLink, setActiveLink] = useState<number>(() => {
    const stored = sessionStorage.getItem("activeLink");
    return stored ? parseInt(stored) : 1;
  });

  const handleLinkClick = useCallback((id: number) => {
    setActiveLink(id);
    sessionStorage.setItem("activeLink", id.toString());
  }, []);

  return (
    <ul className="header__navigation-list" aria-label="Main navigation menu">
      {navigationList.map(({ id, label }) => (
        <HeaderNavItem
          key={id}
          id={id}
          label={label}
          activeLink={activeLink}
          handleLinkClick={handleLinkClick}
        />
      ))}
    </ul>
  );
}

export default HeaderNav;
