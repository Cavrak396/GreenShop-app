import LazyImage from "../../../reusable/lazyImage/LazyImage";
import { DevelopersTypes } from "../types/developersTypes";

function DevelopersImage({ developer }: { developer: DevelopersTypes }) {
  return (
    <LazyImage
      src={developer.image}
      alt={developer.alt}
      className="about__item-developer-image"
    />
  );
}

export default DevelopersImage;
