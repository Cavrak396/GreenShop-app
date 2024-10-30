import HeaderNav from "./HeaderNav";
import HeaderUserToolbar from "./HeaderUserToolbar";
import Logo from "../../reusable/Logo";
import "./header.css";

function Header() {
  return (
    <section className="header">
      <div className="wrap">
        <div className="header__line">
          <Logo className="header__logo"/>
          <HeaderNav />
          <HeaderUserToolbar />
        </div>
      </div>
    </section>
  );
}

export default Header;
