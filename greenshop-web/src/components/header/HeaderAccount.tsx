import Portal from "../../reusable/Portal/Portal";
import UserAccount from "../user-account/UserAccount";
import accountImage from "../../assets/images/account/user.png";
import { useState } from "react";

function HeaderAccount() {
  const [isAppear, setIsAppear] = useState<boolean>(false);

  return (
    <>
      <li
        className="header__usertoolbar-account"
        onClick={() => setIsAppear((prev) => !prev)}
      >
        <img
          src={accountImage}
          alt="User account"
          className="header__usertoolbar-account-image"
        />
      </li>
      {isAppear && (
        <Portal setIsAppear={setIsAppear}>
          <UserAccount />
        </Portal>
      )}
    </>
  );
}

export default HeaderAccount;