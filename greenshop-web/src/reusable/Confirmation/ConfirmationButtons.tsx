import Button from "../button/Button";
import { ConfirmationButtonsProps } from "../types/confirmationTypes";
import { useUser } from "../../context/AuthContext";
import { toast } from "react-toastify";

function ConfirmationButtons({
  setIsAppear,
  onConfirmAction,
  type,
}: ConfirmationButtonsProps) {
  const { user, updateUserDetails } = useUser();

  const handleSubscribe = async () => {
    if (!user) return;

    const dto = {
      isSubscribed: type === "subscribe",
    };

    const result = await updateUserDetails(dto);

    if (result.success) {
      toast.success(
        `You have successfully ${
          type === "subscribe" ? "subscribed" : "unsubscribed"
        }!`
      );
      onConfirmAction?.();
      setIsAppear(false);
    } else {
      toast.error(result.message);
      console.error("Problem", result.message);
    }
  };

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
