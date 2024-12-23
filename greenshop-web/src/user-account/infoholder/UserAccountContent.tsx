import UserAccountLogout from "./logout/UserAccountLogout";
import UserAccountProfile from "./profile/UserAccountProfile";
import UserAccountSubscribe from "./subscribe/UserAccountSubscribe";

function UserAccountContent({ isActive }: { isActive: number }) {
  return (
    <div className="useraccount__content">
      {isActive === 1 && <UserAccountProfile />}
      {isActive === 2 && <UserAccountSubscribe />}
      {isActive === 3 && <UserAccountLogout />}
    </div>
  );
}

export default UserAccountContent;
