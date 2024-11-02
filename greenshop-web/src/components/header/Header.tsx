import HeaderNav from "./HeaderNav";
import HeaderUserToolbar from "./HeaderUserToolbar";
import Logo from "../../reusable/Logo";
import "./header.css";

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
      </div>
    </section>
  );
}

export default Header;
