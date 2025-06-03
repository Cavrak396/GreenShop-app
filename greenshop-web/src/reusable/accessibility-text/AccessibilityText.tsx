import Title from "../titles/Title";
import { AccessibilityTextTypes } from "../types/accessibilityTypes";
import "./accessibillity.css";

function AccessibiltyText({ title, text }: AccessibilityTextTypes) {
  return (
    <div className="accesibility-text">
      <Title className="accessibilty-title">{title}</Title>
      <p className="accessibilty-lines">{text}</p>
    </div>
  );
}

export default AccessibiltyText;
