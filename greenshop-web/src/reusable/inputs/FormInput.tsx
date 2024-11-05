import { forwardRef } from "react";
import { FormInputTypes } from "../types/inputsTypes";

const FormInput = forwardRef<HTMLInputElement, FormInputTypes>(
  ({ className, type, placeholder, min, value, onChange }, ref) => {
    return (
      <input
        placeholder={placeholder}
        className={className}
        min={min}
        type={type}
        ref={ref}
        onChange={onChange}
        value={value}
      />
    );
  }
);

export default FormInput;
