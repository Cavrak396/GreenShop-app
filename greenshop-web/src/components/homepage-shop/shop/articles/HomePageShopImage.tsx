import LazyImage from "../../../../reusable/LazyImage/LazyImage";
import { HomePageShopImageProps } from "../../types/shopTypes";

function HomePageShopImage({ src, alt, onClick }: HomePageShopImageProps) {
  return (
    <LazyImage
      src={src}
      className="homepageshop__article-image"
      alt={alt}
      onClick={onClick}
    />
  );
}

export default HomePageShopImage;
