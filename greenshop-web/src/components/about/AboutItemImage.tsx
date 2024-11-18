import { AboutItemImageProps } from "./types/aboutTypes";

function AboutItemImage({ src, alt }: AboutItemImageProps) {
  return <img className="about__item-image" src={src} alt={alt} />;
}

export default AboutItemImage;
