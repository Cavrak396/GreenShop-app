import "./ErrorMessage.css";
import { ErrorMessageType } from "./types/ErrorMessageType";

function ErrorMessage({ message, className }: ErrorMessageType) {
  return <p className={`errorMessage ${className}`}>{message}</p>;
}

export default ErrorMessage;
