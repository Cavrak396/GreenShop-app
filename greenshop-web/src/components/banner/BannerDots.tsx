import BannerDot from "./BannerDot";
import { BannerImage } from "./BannerGallery";

interface BannerDotsProps {
  activeImage: number;
  setActiveImage: (id: number) => void;
  images: BannerImage[];
}

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
