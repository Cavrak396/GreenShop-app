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
