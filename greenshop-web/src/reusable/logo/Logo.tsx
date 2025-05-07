import { Link } from "react-router-dom";
import LogoImage from "../../assets/images/reusable/Logo.svg";
import { LogoType } from "../types/logoTypes";

function Logo({ className }: LogoType) {
  return (
    <Link to="/" className={`logo-link ${className}`}>
      <img src={LogoImage} alt="Greenshop logo" className="logo-image" />
    </Link>
  );
}

export default Logo;
