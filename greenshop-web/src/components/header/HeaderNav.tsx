import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeaderNavItem from "./HeaderNavItem";
import { navigationList } from "./utils/headerUtils";

function HeaderNav() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<number>(() => {
    const stored = sessionStorage.getItem("activeLink");
    return stored ? parseInt(stored) : 1;
  });

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveLink(1);
      sessionStorage.setItem("activeLink", "1");
    }
  }, [location.pathname]);

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