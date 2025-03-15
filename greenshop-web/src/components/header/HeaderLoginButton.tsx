import Button from "../../reusable/button/Button";
import login from "../../assets/images/header/login-icon.svg";
import { useState } from "react";
import Portal from "../../reusable/Portal/Portal";
import AuthContent from "../authorization/AuthContent";

function LoginButton() {
  const [isAppear, setIsAppear] = useState<boolean>(false);

  function handleModalAppear() {
    setIsAppear(true);
  }

  return (
    <>
      <li className="header__usertoolbar-item">
        <Button
          className="header__usertoolbar-button button"
          onClick={handleModalAppear}
        >
          <img src={login} alt="Login icon" className="header__login-image" />
          Login
        </Button>
      </li>
      {isAppear && (
        <Portal setIsAppear={setIsAppear}>
          <AuthContent />
        </Portal>
      )}
    </>
  );
}

export default LoginButton;
