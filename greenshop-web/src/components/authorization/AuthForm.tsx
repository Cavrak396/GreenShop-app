import type { AuthFormProps } from "./types/authTypes";
import { authInputs } from "./utils/authUtils";
import AuthFormInput from "./AuthFormInput";
import Button from "../button/Button";
import AuthSocialButtons from "./AuthSocialButtons";

function AuthForm({
  activatedId,
  inputRefs,
  showPassword,
  togglePasswordVisibility,
}: AuthFormProps) {
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
        <AuthFormInput
          key={input.id}
          input={input}
          refHandler={(el) => (inputRefs.current[input.id] = el)}
          showPassword={showPassword?.[input.id]}
          togglePasswordVisibility={togglePasswordVisibility}
          onChange={(e) => handleInputChange(e, input.id)}
        />
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
