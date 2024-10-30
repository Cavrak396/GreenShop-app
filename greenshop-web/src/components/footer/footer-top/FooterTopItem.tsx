import { FooterOfferItem } from "./types/footerTopTypes";

function FooterTopItem({ item }: FooterOfferItem) {
  return (
    <li className="footer__top-item">
      <img
        src={item.imageSrc}
        className="footer__top-item-image"
        alt="footer offer image"
      />
      <span className="footer__top-item-tag"> {item.title} </span>
      <p className="footer__top-item-text">{item.text}</p>
    </li>
  );
}

export default FooterTopItem;
