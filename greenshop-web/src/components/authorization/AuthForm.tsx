import type { AuthFormProps } from "./types/authTypes";
import { authInputs } from "./utils/authUtils";
import AuthFormInput from "./AuthFormInput";
import Button from "../../reusable/button/Button";
import AuthSocialButtons from "./AuthSocialButtons";
import AccessibiltyText from "../../reusable/accessibility-text/AccessibilityText";

function AuthForm({
  activatedId,
  inputRefs,
  showPassword,
  togglePasswordVisibility,
  onSubmit,
}: AuthFormProps) {
  const inputsToShow = activatedId === 1 ? authInputs.slice(0, 2) : authInputs;
  const actionTypeText = activatedId === 1 ? "login" : "register";

  return (
    <form onSubmit={onSubmit} aria-labelledby="auth-form-title">
      <AccessibiltyText
        text={actionTypeText === "login" ? "Login Form" : "Register Form"}
        id="auth-form-title"
      />

      {inputsToShow.map((input) => (
        <AuthFormInput
          key={input.id}
          input={input}
          refHandler={(el) => (inputRefs.current[input.id] = el)}
          showPassword={showPassword?.[input.id]}
          togglePasswordVisibility={togglePasswordVisibility}
          aria-label={input.label}
          aria-describedby={`input-desc-${input.id}`}
        />
      ))}

      <Button
        className="authorization__form-button button"
        type="submit"
        aria-label={`Submit ${actionTypeText}`}
      >
        Submit
      </Button>

      <span className="authorization__form-guidance">
        or {actionTypeText} with:
      </span>

      <div
        className="authorization__form-social"
        aria-label="Social media login options"
      >
        <AuthSocialButtons activatedId={activatedId} />
      </div>
    </form>
  );
}

export default AuthForm;
