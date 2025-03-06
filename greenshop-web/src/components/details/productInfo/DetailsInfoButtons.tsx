import { infoButtons } from "../utils/detailsUtils";
import Button from "../../../reusable/button/Button";
import { DetailsInfoButtonsProps } from "../types/detailsTypes";

function DetailsInfoButtons({
  activatedButtonId,
  handleButtonClick,
}: DetailsInfoButtonsProps) {
  return (
    <div className="details__info-buttons">
      {infoButtons.map((button) => (
        <Button
          key={button.id}
          className={`details__info-button ${
            activatedButtonId === button.id ? "activated" : ""
          }`}
          onClick={() => handleButtonClick(button.id)}
          aria-label={button.text}
          aria-pressed={activatedButtonId === button.id ? "true" : "false"}
        >
          {button.text}
        </Button>
      ))}
    </div>
  );
}

export default DetailsInfoButtons;
