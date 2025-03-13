import { UserToolbarType } from "../types/userAccountTypes";
import { menuUtils } from "../utils/userAccountUtils";
import UserAccountToolbarItem from "./UserAccountToolbarItem";

function UserAccountToolbarList({ isActive, setIsActive }: UserToolbarType) {
  return (
    <ul className="useraccount__toolbar-list">
      {menuUtils.map((item) => (
        <UserAccountToolbarItem
          key={item.id}
          item={item}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      ))}
    </ul>
  );
}

export default UserAccountToolbarList;
