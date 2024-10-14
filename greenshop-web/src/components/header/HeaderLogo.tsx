import LogoImage from "../../assets/images/header/Logo.png";

function HeaderLogo() {
  return (
    <a className="header__logo-link">
      <img src={LogoImage} alt="Greenshop logo" className="header__logo" />
    </a>
  );
}

export default HeaderLogo;
