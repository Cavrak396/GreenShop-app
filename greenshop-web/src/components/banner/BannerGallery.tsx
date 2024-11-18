import { bannerImages } from "./utils/bannerUtils";
import { BannerGalleryProps } from "./types/bannerTypes";

function BannerGallery({ activeImage }: BannerGalleryProps) {
  const activeImageData = bannerImages.find(
    (image) => image.id === activeImage
  );

  if (!activeImageData) return null;

  return (
    <div className="banner__images-holder">
      <div className="banner__images-item">
        <img
          src={activeImageData.src}
          alt={activeImageData.alt}
          className="banner__images-image"
        />
      </div>
    </div>
  );
}

export default BannerGallery;
