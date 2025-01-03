import ConfirmationButtons from "./ConfirmationButtons";
import "../reusable.css";
import { ConfirmationTypes } from "../types/confirmationTypes";

type ConfirmationContentProps = ConfirmationTypes & {
  onConfirmAction: (() => void) | null;
};

function ConfirmationContent({
  message,
  setIsAppear,
  onConfirmAction,
}: ConfirmationContentProps) {
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
