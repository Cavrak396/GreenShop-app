import { useLocation } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import HeaderUserToolbar from "./HeaderUserToolbar";
import Logo from "../../reusable/logo/Logo";
import HeaderResponsiveMessage from "./headerResponsive/HeaderResponsiveMessage";
import HeaderResponsiveBackButton from "./headerResponsive/HeaderResponsiveBackButton";
import "./header.css";

function Header() {
  const location = useLocation();

  const isOnDetailsPage = location.pathname.startsWith("/details");

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
        {isOnDetailsPage && <HeaderResponsiveBackButton />}
      </div>
    </section>
  );
}

export default Header;
