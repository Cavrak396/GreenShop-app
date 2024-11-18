import LazyImage from "../../../reusable/LazyImage/LazyImage";
import { FooterOfferItem } from "./types/footerTopTypes";

function FooterTopImage({ item }: FooterOfferItem) {
  return (
    <LazyImage
      src={item.imageSrc}
      className="footer__top-item-image"
      alt="footer offer image"
    />
  );
}

export default FooterTopImage;
