import { ReactNode, ButtonHTMLAttributes } from "react";
import "./button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button type="button" className={className} {...rest}>
      {children}
    </button>
  );
}

export default Button;
