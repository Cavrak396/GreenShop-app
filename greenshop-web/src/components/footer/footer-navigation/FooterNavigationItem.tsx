import { FooterNavigationItemType } from "./types/footerNavigationTypes";

function FooterNavigationItem({ item }: FooterNavigationItemType) {
  return (
    <li className="footer__navigation-item">
      <a
        href="#"
        className="footer__navigation-link"
        onClick={(e) => e.preventDefault()}
      >
        {item.text}
      </a>
    </li>
  );
}

export default FooterNavigationItem;
