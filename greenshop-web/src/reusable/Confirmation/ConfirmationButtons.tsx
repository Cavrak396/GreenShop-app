import Button from "../../components/button/Button";
import { ConfirmationTypes } from "../types/confirmationTypes";

function ConfirmationButtons({ setIsAppear }: ConfirmationTypes) {
  return (
    <div className="confirmation__buttons">
      <Button className="confirmation__button button">Yes</Button>
      <Button
        className="confirmation__button button"
        onClick={() => setIsAppear((prev) => !prev)}
      >
        No
      </Button>
    </div>
  );
}

export default ConfirmationButtons;
