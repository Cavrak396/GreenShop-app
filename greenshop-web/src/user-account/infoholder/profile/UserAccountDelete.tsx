import Button from "../../../reusable/button/Button";
import { ConfirmationTypes } from "../../../reusable/types/confirmationTypes";
import { useUser } from "../../../context/AuthContext";

function UserAccountDelete({ setIsAppear }: ConfirmationTypes) {
  const { deleteAccount, loading, error, token } = useUser();

  const handleDelete = async () => {
    if (!token) {
      alert("You are not authenticated. Please log in first.");
      return;
    }

    try {
      const response = await deleteAccount();
      if (response && response.message) {
        alert(response.message);
      } else {
        alert("Account deleted successfully.");
      }
    } catch (err) {
      alert("An error occurred while deleting the account.");
      console.error("Error deleting account:", err);
    }

    setIsAppear(false);
  };

  return (
    <div className="useraccount__profile-delete">
      <p className="useraccount__profile-text">
        If you wish to delete your account, you can easily do so by clicking the
        button below. You're always welcome back!
      </p>
      {error && <p className="error-message">{error}</p>}
      <Button
        className="useraccount__profile-button button"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Account"}
      </Button>
    </div>
  );
}

export default UserAccountDelete;
