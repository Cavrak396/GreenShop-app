import { ErrorMessageType } from "./types/ErrorMessageType";
import "./ErrorMessage.css"

function ErrorMessage({ message, className }: ErrorMessageType) {
  return <p className={`errorMessage ${className}`}>{message}</p>;
}

export default ErrorMessage;
