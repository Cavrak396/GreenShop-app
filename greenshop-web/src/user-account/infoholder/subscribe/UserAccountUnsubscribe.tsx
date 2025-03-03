import Button from "../../../reusable/button/Button";
import { ConfirmationTypes } from "../../../reusable/types/confirmationTypes";

function UserAccountUnsubscribe({ setIsAppear }: ConfirmationTypes) {
  const handleUnsubscribeClick = () => {
    setIsAppear(true);
  };

  return (
    <div className="useraccount__unsubscribe">
      <p className="useraccount__unsubscribe-text">
        If you wish to stop receiving notifications, simply click the
        unsubscribe button.
      </p>
      <Button
        className="useraccount__unsubscribe-button button"
        onClick={handleUnsubscribeClick}
      >
        Unsubscribe
      </Button>
    </div>
  );
}

export default UserAccountUnsubscribe;
