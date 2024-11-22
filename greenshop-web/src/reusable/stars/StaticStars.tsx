import emptyStar from "../../assets/images/reusable/empty-star.svg";
import fullStar from "../../assets/images/reusable/star.svg";
import LazyImage from "../LazyImage/LazyImage";
import "../reusable.css";
import { StarsType } from "../types/stars";

const StaticStars = ({
  rate,
  starClassName,
  starPositionClassName,
}: StarsType) => {
  return (
    <div className={starPositionClassName}>
      {Array.from({ length: 5 }, (_, index) => (
        <LazyImage
          key={index}
          src={index < rate ? fullStar : emptyStar}
          alt={index < rate ? "Full star" : "Empty star"}
          className={starClassName}
        />
      ))}
    </div>
  );
};

export default StaticStars;
