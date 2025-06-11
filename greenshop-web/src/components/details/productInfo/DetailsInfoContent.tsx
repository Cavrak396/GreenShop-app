import DetailsProductDescription from "../DetailsProductDescription";
import { DetailsInfoContentProps } from "../types/detailsTypes";
import DetailsCritique from "../productCritique/DetailsCritique";

function DetailsInfoContent({ activatedButtonId }: DetailsInfoContentProps) {
  return (
    <>
      {activatedButtonId === 1 ? (
        <DetailsProductDescription />
      ) : (
        <DetailsCritique />
      )}
    </>
  );
}

export default DetailsInfoContent;