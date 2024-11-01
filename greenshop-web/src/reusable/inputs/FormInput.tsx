import { forwardRef } from "react";
import { FormInputTypes } from "../types/inputsTypes";

const FormInput = forwardRef<HTMLInputElement, FormInputTypes>(
  ({ className, type, placeholder }, ref) => {
    return (
      <input
        placeholder={placeholder}
        className={className}
        type={type}
        ref={ref}
      />
    );
  }
);

export default FormInput;
