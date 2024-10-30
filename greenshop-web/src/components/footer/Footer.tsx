import FooterInfo from "./footer-info/FooterInfo";
import FooterNavigation from "./footer-navigation/FooterNavigation";
import FooterTop from "./footer-top/FooterTop";
import FooterCopyRight from "./FooterCopyRight";

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <FooterTop />
        <FooterInfo />
        <FooterNavigation />
        <FooterCopyRight />
      </div>
    </footer>
  );
}

export default Footer;
