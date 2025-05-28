import { useUser } from "../../../../context/AuthContext";
import Button from "../../../../reusable/button/Button";
import { ConfirmationTypes } from "../../../../reusable/types/confirmationTypes";

function UserAccountSubscribe({
  setIsAppear,
  setOnConfirmAction,
}: ConfirmationTypes) {
  const { user, updateUserDetails } = useUser();
  const isSubscribed = user?.isSubscribed ?? false;

  const handleClick = () => {
    setIsAppear(true);

    if (!setOnConfirmAction) return;

    setOnConfirmAction(() => async () => {
      if (!updateUserDetails) return;
      await updateUserDetails({ isSubscribed: !isSubscribed });
    });
  };

  const message = isSubscribed
    ? "If you wish to stop receiving notifications, simply click the unsubscribe button."
    : "You're currently unsubscribed. Click the button below to start receiving notifications.";

  return (
    <div className="useraccount__subscribe">
      <p className="useraccount__subscribe-text useraccount__subscribe-text--modified">
        Subscribe to our newsletter and stay updated with the latest information
        about our plants, special discounts, and exclusive offers! As a
        subscriber, you'll be the first to know about new plant varieties,
        decoration tips, and the latest trends in horticulture.
      </p>
      <div className="useraccount__unsubscribe">
        <p className="useraccount__unsubscribe-text">{message}</p>
        <Button
          className="useraccount__unsubscribe-button button"
          onClick={handleClick}
        >
          {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </Button>
      </div>
    </div>
  );
}

export default UserAccountSubscribe;
