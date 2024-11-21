import ProgressBar from "react-progressbar";
import { ProgressBarProps } from "../types/progressBar";
import "../reusable.css";

function ProgressBarComponent({
  percentage,
  rating,
  color,
  className,
}: ProgressBarProps) {
  return (
    <div className="rating-bar-container">
      <span className="rating-bar-label">{rating} stars</span>
      <ProgressBar completed={percentage} className={className} color={color} />
    </div>
  );
}

export default ProgressBarComponent;
