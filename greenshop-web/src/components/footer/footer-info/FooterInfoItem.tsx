import FooterInfoImage from "./FooterInfoImage";
import { FooterItemType } from "./types/footerInfo";

function FooterInfoItem({ item }: FooterItemType) {
  return (
    <li className="footer__info-item">
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="footer__info-link"
      >
        <FooterInfoImage item={item} />
        <span className="footer__info-text">{item.text}</span>
      </a>
    </li>
  );
}

export default FooterInfoItem;
