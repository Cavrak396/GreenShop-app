import HeaderNav from "./HeaderNav";
import HeaderUserToolbar from "./HeaderUserToolbar";
import Logo from "../../reusable/logo/Logo";
import "./header.css";
import HeaderResponsiveMessage from "./headerResponsive/HeaderResponsiveMessage";

function Header() {
  return (
    <section className="header">
      <div className="wrap">
        <div className="header__line">
          <div className="header__logo-holder">
            <Logo className="header__logo" />
          </div>
          <HeaderNav />
          <HeaderUserToolbar />
        </div>
        <HeaderResponsiveMessage />
      </div>
    </section>
  );
}

export default Header;
