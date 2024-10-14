import Button from "../button/Button";
import login from "../../assets/images/header/login-icon.png";

function LoginButton() {
  return (
    <li className="header__usertoolbar-item">
      <Button className="header__usertoolbar-button button">
        <img src={login} alt="Login icon" className="header__login-image" />
        Login
      </Button>
    </li>
  );
}

export default LoginButton;
