import "../reusable.css";
import Button from "../../components/button/Button";
import { TextInputType } from "../types/inputsTypes";

function TextInput({
  type,
  inputClass,
  placeholder,
  buttonText,
  buttonClass,
}: TextInputType) {
  return (
    <>
      <input
        type={type}
        className={`text-input ${inputClass}`}
        placeholder={placeholder}
        aria-label={placeholder}
        required
      />
      <Button className={`button ${buttonClass}`}>{buttonText}</Button>
    </>
  );
}

export default TextInput;
