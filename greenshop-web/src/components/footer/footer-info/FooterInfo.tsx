import Logo from "../../../reusable/logo/Logo";
import FooterInfoItem from "./FooterInfoItem";
import { footerInfos } from "./utils/footerInfoUtils";

function FooterInfo() {
  return (
    <div className="footer__info-line">
      <Logo className="footer__logo-link" />
      <ul className="footer__info-list">
        {footerInfos.map((item) => {
          return <FooterInfoItem item={item} key={item.id} />;
        })}
      </ul>
    </div>
  );
}

export default FooterInfo;
