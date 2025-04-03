import { useCallback } from "react";
import DetailsInfoButtons from "./DetailsInfoButtons";
import DetailsInfoContent from "./DetailsInfoContent";
import { usePagination } from "../../../context/PaginationContext";

function DetailsProductInfo() {
  const { activeDetailsInfoButton, setActiveDetailsInfoButton } =
    usePagination();

  const handleButtonClick = useCallback((id: number) => {
    setActiveDetailsInfoButton(id);
  }, []);

  return (
    <div className="details__info">
      <DetailsInfoButtons
        activatedButtonId={activeDetailsInfoButton}
        handleButtonClick={handleButtonClick}
      />
      <DetailsInfoContent activatedButtonId={activeDetailsInfoButton} />
    </div>
  );
}

export default DetailsProductInfo;
