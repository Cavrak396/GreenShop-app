import flowerpotFirst from "../../assets/banner-image.png";
import flowerpotSecond from "../../assets/banner-image-second.png";
import flowerpotThird from "../../assets/banner-image-third.png";

export interface BannerImage {
  id: number;
  src: string;
  alt: string;
}

interface BannerGalleryProps {
  activeImage: number;
}

export const bannerImages: BannerImage[] = [
  { id: 1, src: flowerpotFirst, alt: "First flowerpot image" },
  { id: 2, src: flowerpotSecond, alt: "Second flowerpot image" },
  { id: 3, src: flowerpotThird, alt: "Third flowerpot image" },
];

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
