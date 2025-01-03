import Button from "../../../components/button/Button";
import { LogoutProps } from "../../types/userAccountTypes";

function UserAccountLogout({
  setIsAppear,
  setOnConfirmAction,
  logout,
}: LogoutProps) {
  const handleLogout = () => {
    setIsAppear(true);
    setOnConfirmAction(() => async () => {
      logout();
      setIsAppear(false);
    });
  };

  return (
    <div className="useraccount__logout">
      <p className="useraccount__logout-text">
        Click the button below to log out of your account. This action will end
        your current session and ensure your data remains secure.
      </p>
      <Button
        className="useraccount__logout-button button"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}

export default UserAccountLogout;
