import "../reusable.css";
import Button from "../button/Button";
import { TextInputType } from "../types/inputsTypes";

function TextInput({
  type,
  inputClass,
  placeholder,
  value,
  onChange,
  buttonText,
  buttonClass,
  onButtonClick,
}: TextInputType) {
  return (
    <div className="text-input-container">
      <input
        type={type}
        className={`text-input ${inputClass}`}
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {buttonText && (
        <Button className={`button ${buttonClass}`} onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}

export default TextInput;
