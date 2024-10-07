import HeaderNav from "./HeaderNav";
import HeaderUserToolbar from "./HeaderUserToolbar";
import Logo from "../../assets/Logo.png";
import "./header.css";

function Header() {
  return (
    <section className="header">
      <div className="wrap">
        <div className="header__line">
          <a className="header__logo-link">
            <img src={Logo} alt="Greenshop logo" className="header__logo" />
          </a>
          <HeaderNav />
          <HeaderUserToolbar />
        </div>
      </div>
    </section>
  );
}

export default Header;
