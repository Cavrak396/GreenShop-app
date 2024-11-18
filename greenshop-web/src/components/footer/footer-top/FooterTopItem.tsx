import FooterTopImage from "./FooterTopImage";
import { FooterOfferItem } from "./types/footerTopTypes";

function FooterTopItem({ item }: FooterOfferItem) {
  return (
    <li className="footer__top-item">
      <FooterTopImage item={item}/>
      <span className="footer__top-item-tag"> {item.title} </span>
      <p className="footer__top-item-text">{item.text}</p>
    </li>
  );
}

export default FooterTopItem;
