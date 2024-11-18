import { LazyLoadImage } from "react-lazy-load-image-component";
import { LazyImageTypes } from "../types/lazyImage";
import "react-lazy-load-image-component/src/effects/blur.css";

function LazyImage({
  src,
  alt,
  className,
  effect = "blur",
  ...props
}: LazyImageTypes) {
  return <LazyLoadImage className={className} src={src} alt={alt} effect={effect} {...props} />;
}

export default LazyImage;
