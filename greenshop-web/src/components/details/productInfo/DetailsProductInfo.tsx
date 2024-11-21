import { useState, useCallback } from "react";
import DetailsInfoButtons from "./DetailsInfoButtons";
import DetailsInfoContent from "./DetailsInfoContent";

function DetailsProductInfo() {
  const [activatedButtonId, setActivatedButtonId] = useState(1);

  const handleButtonClick = useCallback((id: number) => {
    setActivatedButtonId(id);
  }, []);

  return (
    <div className="details__info">
      <DetailsInfoButtons
        activatedButtonId={activatedButtonId}
        handleButtonClick={handleButtonClick}
      />
      <DetailsInfoContent activatedButtonId={activatedButtonId} />
    </div>
  );
}

export default DetailsProductInfo;
