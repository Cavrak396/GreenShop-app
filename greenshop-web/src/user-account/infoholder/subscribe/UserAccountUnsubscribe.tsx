import Button from "../../../reusable/button/Button";
import { ConfirmationTypes } from "../../../reusable/types/confirmationTypes";

function UserAccountUnsubscribe({ setIsAppear }: ConfirmationTypes) {
  return (
    <div className="useraccount__unsubscribe">
      <p className="useraccount__unsubscribe-text">
        If you wish to stop receiving notifications, simply click the
        unsubscribe button.
      </p>
      <Button
        className="useraccount__unsubscribe-button button"
        onClick={() => setIsAppear((prev) => !prev)}
      >
        Unsubscribe
      </Button>
    </div>
  );
}

export default UserAccountUnsubscribe;
