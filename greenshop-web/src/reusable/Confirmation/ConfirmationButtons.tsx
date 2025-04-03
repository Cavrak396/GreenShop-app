import Button from "../button/Button";
import { ConfirmationButtonsProps } from "../types/confirmationTypes";
import { useUser } from "../../context/AuthContext";

function ConfirmationButtons({
  setIsAppear,
  onConfirmAction,
  type,
}: ConfirmationButtonsProps) {
  const { user, updateUserDetails } = useUser();

  function handleSubscribe() {
    let userUpdate;

    switch (type) {
      case "subscribe":
        userUpdate = { isSubscribed: true };
        break;
      case "unsubscribe":
        userUpdate = { isSubscribed: false };
        break;
      default:
        return;
    }

    if (user && userUpdate) {
      const userToUpdate = {
        ...userUpdate,
      };

      updateUserDetails(userToUpdate).then(() => {
        if (onConfirmAction) onConfirmAction();
        setIsAppear(false);
      });
    }
  }

  return (
    <div className="confirmation__buttons">
      <Button
        className="confirmation__button button"
        onClick={() => {
          handleSubscribe();
          if (onConfirmAction) onConfirmAction();
        }}
      >
        Yes
      </Button>
      <Button
        className="confirmation__button button"
        onClick={() => setIsAppear(false)}
      >
        No
      </Button>
    </div>
  );
}

export default ConfirmationButtons;
