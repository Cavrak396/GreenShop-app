import { useState } from "react";
import { useComments } from "../../../../../context/ReviewsContext";
import emptyStar from "../../../../../assets/images/reusable/empty-star.svg";
import fullStar from "../../../../../assets/images/reusable/star.svg";
import LazyImage from "../../../../../reusable/LazyImage/LazyImage";
import "../../../details.css";

function DetailsCritiqueCommentsStars() {
  const { rating, changeRating } = useComments();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleClick = (index: number) => {
    changeRating(index + 1);
  };

  return (
    <div className="details__comments-stars">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        >
          <LazyImage
            src={
              index < (hoveredIndex !== null ? hoveredIndex + 1 : rating)
                ? fullStar
                : emptyStar
            }
            alt={
              index < (hoveredIndex !== null ? hoveredIndex + 1 : rating)
                ? "Full star"
                : "Empty star"
            }
            className="details__comments-star details__comments-stars--modified"
          />
        </div>
      ))}
    </div>
  );
}

export default DetailsCritiqueCommentsStars;
