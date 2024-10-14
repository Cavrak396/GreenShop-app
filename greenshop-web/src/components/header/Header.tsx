import HeaderNav from "./HeaderNav";
import HeaderUserToolbar from "./HeaderUserToolbar";
import HeaderLogo from "./HeaderLogo";
import "./header.css";

function Header() {
  return (
    <section className="header">
      <div className="wrap">
        <div className="header__line">
          <HeaderLogo />
          <HeaderNav />
          <HeaderUserToolbar />
        </div>
      </div>
    </section>
  );
}

export default Header;
