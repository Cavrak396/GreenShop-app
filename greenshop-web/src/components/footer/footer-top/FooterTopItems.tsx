import FooterTopItem from "./FooterTopItem";
import { footerTopOffers } from "./utils/footerTopUtils";

function FooterTopItems() {
  return (
    <ul className="footer__top-item-list">
      {footerTopOffers.map((item) => {
        return <FooterTopItem item={item} key={item.id} />;
      })}
    </ul>
  );
}

export default FooterTopItems;