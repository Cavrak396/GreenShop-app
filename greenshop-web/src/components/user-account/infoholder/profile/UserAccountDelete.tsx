import { useUser } from "../../../../context/AuthContext";
import Button from "../../../../reusable/button/Button";
import { ConfirmationTypes } from "../../../../reusable/types/confirmationTypes";

function UserAccountDelete({
  setIsAppear,
  setOnConfirmAction,
}: ConfirmationTypes) {
  const { deleteAccount } = useUser();

  const handleDeleteClick = () => {
    setIsAppear(true);

    if (!setOnConfirmAction) return;

    setOnConfirmAction(() => async () => {
      await deleteAccount();
      setIsAppear(false);
    });
  };

  return (
    <div className="useraccount__profile-delete">
      <p className="useraccount__profile-text">
        If you wish to delete your account, you can easily do so by clicking the
        button below. You're always welcome back!
      </p>
      <Button
        className="useraccount__profile-button button"
        onClick={handleDeleteClick}
      >
        Delete Account
      </Button>
    </div>
  );
}

export default UserAccountDelete;