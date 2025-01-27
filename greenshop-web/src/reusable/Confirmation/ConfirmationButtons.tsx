import Button from "../button/Button";
import { ConfirmationTypes } from "../types/confirmationTypes";

type ConfirmationButtonsProps = ConfirmationTypes & {
  onConfirmAction: (() => void) | null;
};

function ConfirmationButtons({
  setIsAppear,
  onConfirmAction,
}: ConfirmationButtonsProps) {
  return (
    <div className="confirmation__buttons">
      <Button
        className="confirmation__button button"
        onClick={() => {
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