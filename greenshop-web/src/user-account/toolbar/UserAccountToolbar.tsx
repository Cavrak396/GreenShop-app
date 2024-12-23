import { UserToolbarType } from "../types/userAccountTypes";
import UserAccountToolbarList from "./UserAccountToolbarList";

function UserAccountToolbar({ isActive, setIsActive }: UserToolbarType) {
  return (
    <div className="useraccount__toolbar">
      <UserAccountToolbarList isActive={isActive} setIsActive={setIsActive} />
    </div>
  );
}

export default UserAccountToolbar;