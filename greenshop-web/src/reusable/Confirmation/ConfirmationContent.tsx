import ConfirmationButtons from "./ConfirmationButtons";
import { ConfirmationTypes } from "../types/confirmationTypes";
import "../reusable.css";

type ConfirmationContentProps = ConfirmationTypes & {
  onConfirmAction: (() => void) | null;
};

function ConfirmationContent({
  message,
  setIsAppear,
  onConfirmAction,
  type,
}: ConfirmationContentProps) {
  return (
    <div className="confirmation__content">
      <p className="confirmation__message">{message}</p>
      <ConfirmationButtons
        type={type}
        setIsAppear={setIsAppear}
        onConfirmAction={onConfirmAction}
      />
    </div>
  );
}

export default ConfirmationContent;
