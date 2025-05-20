import { useUser } from "../../../../context/AuthContext";
import Button from "../../../../reusable/button/Button";
import { ConfirmationTypes } from "../../../../reusable/types/confirmationTypes";

function UserAccountLogout({
  setIsAppear,
  setOnConfirmAction,
}: ConfirmationTypes) {
  const { logout } = useUser();

  function handleLogout() {
    setIsAppear(true);

    if (!setOnConfirmAction) return;

    setOnConfirmAction(() => async () => {
      logout();
      setIsAppear(false);
    });
  }

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
