import { footerNavigationSocial } from "../utils/footerNavigationUtils";
import FooterSocialItem from "./FooterSocialItem";
import Title from "../../../../reusable/titles/Title";

function FooterSocialList() {
  return (
    <>
      <Title className="footer__navigation-title small-title">
        Social Media
      </Title>
      <ul className="footer__navigation-social-list">
        {footerNavigationSocial.map((item) => (
          <FooterSocialItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
}

export default FooterSocialList;
