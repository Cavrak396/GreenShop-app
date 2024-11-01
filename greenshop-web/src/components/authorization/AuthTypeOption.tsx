import { authType } from "./utils/authUtils";
import { AuthCurrentDataTypes } from "./types/authTypes";
import Button from "../button/Button";

function AuthTypeOption({
  activatedId,
  setActivatedId,
  inputRefs,
  togglePasswordVisibility,
}: AuthCurrentDataTypes) {
  function handleClearInformation() {
    Object.values(inputRefs.current).forEach((input) => {
      if (input) input.value = "";
    });

    authType.forEach((item) => {
      togglePasswordVisibility(item.id);
    });
  }

  return (
    <ul className="authorization__buttons-list">
      {authType.map((item) => {
        return (
          <Button
            className={`authorization__button ${
              activatedId === item.id && `authorization__button--activated`
            }`}
            onClick={() => {
              if (setActivatedId) {
                setActivatedId(item.id);
                handleClearInformation();
              }
            }}
            key={item.id}
          >
            {item.type}
          </Button>
        );
      })}
    </ul>
  );
}

export default AuthTypeOption;
