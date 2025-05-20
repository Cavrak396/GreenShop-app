import ConfirmationButtons from "./ConfirmationButtons";
import { ConfirmationProps } from "../types/confirmationTypes";
import "../reusable.css";

function ConfirmationContent({
  message,
  setIsAppear,
  onConfirmAction,
}: ConfirmationProps) {
  return (
    <div className="confirmation__content">
      <p className="confirmation__message">{message}</p>
      <ConfirmationButtons
        setIsAppear={setIsAppear}
        onConfirmAction={onConfirmAction}
      />
    </div>
  );
}

export default ConfirmationContent;