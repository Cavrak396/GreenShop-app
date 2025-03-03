import Button from "../button/Button";
import { ConfirmationButtonsProps } from "../types/confirmationTypes";
import { useSubscriber } from "../../context/SubscribersContext";

function ConfirmationButtons({
  setIsAppear,
  onConfirmAction,
  type,
}: ConfirmationButtonsProps) {
  const { unsubscribe } = useSubscriber();

  function handleActionClick() {
    switch (type) {
      case "unsubscribe":
        unsubscribe();
        break;
      default:
        break;
    }
  }

  return (
    <div className="confirmation__buttons">
      <Button
        className="confirmation__button button"
        onClick={() => {
          handleActionClick();
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
