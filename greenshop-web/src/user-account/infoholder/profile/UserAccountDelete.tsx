import Button from "../../../components/button/Button";
import { ConfirmationTypes } from "../../../reusable/types/confirmationTypes";
import { useUser } from "../../../context/AuthContext";

function UserAccountDelete({ setIsAppear }: ConfirmationTypes) {
  
  const {user} = useUser();

function handleUserTest() {
  console.log(user);
}
   
  return (
    <div className="useraccount__profile-delete">
      <p className="useraccount__profile-text">
        If you wish to delete your account, you can easily do so by clicking the
        button below. You're always welcome back!
      </p>
      <Button
        className="useraccount__profile-button button"
        onClick={() => handleUserTest()}
      >
        Delete Account
      </Button>
    </div>
  );
}

export default UserAccountDelete;
