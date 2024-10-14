import HeaderNavItem from "./HeaderNavItem";
import { useState, useCallback } from "react";

interface NavigationItem {
  id: number;
  label: string;
}

const navigationList: NavigationItem[] = [
  { id: 1, label: "Home" },
  { id: 2, label: "Shop" },
  { id: 3, label: "Plant Care" },
  { id: 4, label: "Blogs" },
];

function HeaderNav() {
  const [activeLink, setActiveLink] = useState<number>(1);

  const handleLinkClick = useCallback((id: number) => {
    setActiveLink(id);
  }, []);

  return (
    <ul className="header__navigation-list">
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
