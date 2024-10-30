import { FooterItemType } from "./types/footerInfo";

function FooterInfoItem({ item }: FooterItemType) {
  return (
    <li className="footer__info-item">
      <a href={item.text} className="footer__info-link">
        <img src={item.imageSrc} className="footer__info-image" />
        <span className="footer__info-text">{item.text}</span>
      </a>
    </li>
  );
}

export default FooterInfoItem;
