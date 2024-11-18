import BannerDot from "./BannerDot";
import { BannerDotsProps } from "./types/bannerTypes";

function BannerDots({ activeImage, setActiveImage, images }: BannerDotsProps) {
  return (
    <div className="banner__dots">
      {images.map((image) => (
        <BannerDot
          key={image.id}
          id={image.id}
          isActive={activeImage === image.id}
          onClick={setActiveImage}
        />
      ))}
    </div>
  );
}

export default BannerDots;
