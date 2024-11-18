import { HomePageShopImageProps } from "../shopTypes";

function HomePageShopImage({ src, alt, onClick }: HomePageShopImageProps) {
  return (
    <img
      src={src}
      className="homepageshop__article-image"
      alt={alt}
      onClick={onClick}
    />
  );
}

export default HomePageShopImage;
