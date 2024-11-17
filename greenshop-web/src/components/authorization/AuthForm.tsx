import { authInputs } from "./utils/authUtils";
import FormInput from "../../reusable/inputs/FormInput";
import Button from "../button/Button";
import AuthSocialButtons from "./AuthSocialButtons";
import { AuthCurrentDataTypes } from "./types/authTypes";

function AuthForm({
  activatedId,
  inputRefs,
  showPassword,
  togglePasswordVisibility,
}: AuthCurrentDataTypes) {
  const inputsToShow = activatedId === 1 ? authInputs.slice(0, 2) : authInputs;
  const actionTypeText = activatedId === 1 ? "login" : "register";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputsToShow.forEach((input) => {
      const inputValue = inputRefs.current[input.id]?.value;
      console.log(`Input ${input.id} value: ${inputValue}`);
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputId: number
  ) => {
    console.log(`Input ${inputId} changed to: ${e.target.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputsToShow.map((input) => (
        <div key={input.id} className="authorization__input-holder">
          <FormInput
            className="authorization__form-input"
            type={
              input.type === "password" && showPassword?.[input.id]
                ? "text"
                : input.type
            }
            placeholder={input.placeholder}
            ref={(el) => (inputRefs.current[String(input.id)] = el)}
            onChange={(e) => handleInputChange(e, input.id)}
          />
          {input.type === "password" && input.icon && (
            <Button
              type="button"
              className="authorization__form-hide"
              onClick={() => togglePasswordVisibility(input.id)}
            >
              <img
                src={input.icon}
                alt="hide icon"
                className="authorization__form-hide-img"
              />
            </Button>
          )}
        </div>
      ))}
      <Button className="authorization__form-button button" type="submit">
        {actionTypeText}
      </Button>
      <span className="authorization__form-guidance">
        or {actionTypeText} with:
      </span>
      <div className="authorization__form-social">
        <AuthSocialButtons activatedId={activatedId} />
      </div>
    </form>
  );
}

export default AuthForm;
