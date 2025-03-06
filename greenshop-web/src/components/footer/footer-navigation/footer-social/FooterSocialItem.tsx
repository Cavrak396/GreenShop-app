import { FooterNavigationSocialItem } from "../types/footerNavigationTypes";

function FooterSocialItem({ item }: FooterNavigationSocialItem) {
  return (
    <li className="footer__navigation-social-item">
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        aria-label={`Go to ${item.name} social media page`}
      >
        <img
          src={item.src}
          className="footer__navigation-social-image"
          alt={`Icon for ${item.name} social media`}
        />
      </a>
    </li>
  );
}

export default FooterSocialItem;
