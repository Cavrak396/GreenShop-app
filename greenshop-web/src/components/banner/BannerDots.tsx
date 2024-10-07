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
        <span
          key={image.id}
          className={`banner__dot ${
            activeImage === image.id ? "active-dot" : ""
          }`}
          onClick={() => setActiveImage(image.id)}
        ></span>
      ))}
    </div>
  );
}

export default BannerDots;
