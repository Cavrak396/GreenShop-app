import FooterNavigationList from "./FooterNavigationList";
import FooterSocial from "./footer-social/FooterSocial";

function FooterNavigation() {
  return (
    <div className="footer__navigation">
      <FooterNavigationList />
      <FooterSocial />
    </div>
  );
}

export default FooterNavigation;
