import LogoImage from "../../assets/images/reusable/Logo.svg";
import { LogoType } from "../types/logoTypes";

function Logo({ className }: LogoType) {
  return (
    <a className={`logo-link ${className}`}>
      <img src={LogoImage} alt="Greenshop logo" className="logo-image" />
    </a>
  );
}

export default Logo;
