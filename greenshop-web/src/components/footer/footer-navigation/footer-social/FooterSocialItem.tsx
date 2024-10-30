import { FooterNavigationSocialItem } from "../types/footerNavigationTypes";

function FooterSocialItem({ item }: FooterNavigationSocialItem) {
  return (
    <li className="footer__navigation-social-item">
      <a href="#" onClick={(e) => e.preventDefault()}>
        <img
          src={item.src}
          className="footer__navigation-social-image"
          alt={item.name}
        />
      </a>
    </li>
  );
}

export default FooterSocialItem;
