import LazyImage from "../../reusable/lazyImage/LazyImage";
import { AboutItemImageProps } from "./types/aboutTypes";

function AboutItemImage({ src, alt }: AboutItemImageProps) {
  return <LazyImage className="about__item-image" src={src} alt={alt} />;
}

export default AboutItemImage;
