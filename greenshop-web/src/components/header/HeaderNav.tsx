import { useState } from "react";

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

  function handleLinkClick(id: number) {
    setActiveLink(id);
  }

  return (
    <ul className="header__navigation-list">
      {navigationList.map(({ id, label }) => (
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
      ))}
    </ul>
  );
}

export default HeaderNav;
