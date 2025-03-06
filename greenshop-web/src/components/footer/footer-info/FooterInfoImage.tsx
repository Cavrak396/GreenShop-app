import { FooterItemType } from "./types/footerInfo";

function FooterInfoImage({ item }: FooterItemType) {
  return <img src={item.imageSrc} className="footer__info-image" alt={item.alt}/>;
}

export default FooterInfoImage;
