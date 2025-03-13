import { useState } from "react";
import UserAccountToolbar from "./toolbar/UserAccountToolbar";
import "./userAccount.css";
import UserAccountContent from "./infoholder/UserAccountContent";

function UserAccount() {
  const [isActive, setIsActive] = useState<number>(1);

  return (
    <div className="useraccount">
      <div className="useraccount__line">
        <UserAccountToolbar isActive={isActive} setIsActive={setIsActive} />
        <UserAccountContent isActive={isActive} />
      </div>
    </div>
  );
}

export default UserAccount;