import type { AuthFormInputProps } from "./types/authTypes";
import Button from "../button/Button";
import FormInput from "../../reusable/inputs/FormInput";

function AuthFormInput({
  input,
  refHandler,
  showPassword,
  togglePasswordVisibility,
  onChange,
}: AuthFormInputProps) {
  return (
    <div className="authorization__input-holder">
      <FormInput
        className="authorization__form-input"
        type={input.type === "password" && showPassword ? "text" : input.type}
        placeholder={input.placeholder}
        ref={refHandler}
        onChange={onChange}
      />
      {input.type === "password" && input.icon && togglePasswordVisibility && (
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
  );
}

export default AuthFormInput;
