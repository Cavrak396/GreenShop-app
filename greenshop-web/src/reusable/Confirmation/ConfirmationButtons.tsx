import Button from "../button/Button";
import { ConfirmationProps } from "../types/confirmationTypes";

function ConfirmationButtons({
  setIsAppear,
  onConfirmAction,
}: ConfirmationProps) {
  const handleAction = async () => {
    try {
      onConfirmAction?.();
    } catch (error) {
      console.error("Error during confirmation:", error);
    } finally {
      setIsAppear(false);
    }
  };

  return (
    <div className="confirmation__buttons">
      <Button className="confirmation__button button" onClick={handleAction}>
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