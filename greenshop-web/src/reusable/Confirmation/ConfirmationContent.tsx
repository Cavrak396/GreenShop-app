import ConfirmationButtons from "./ConfirmationButtons";
import "../reusable.css";
import { ConfirmationTypes } from "../types/confirmationTypes";

function ConfirmationContent({ message, setIsAppear }: ConfirmationTypes) {
  return (
    <div className="confirmation__content">
      <p className="confirmation__message">{message}</p>
      <ConfirmationButtons setIsAppear={setIsAppear} />
    </div>
  );
}

export default ConfirmationContent;
