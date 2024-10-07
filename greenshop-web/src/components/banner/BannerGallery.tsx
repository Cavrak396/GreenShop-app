import flowerpotFirst from "../../assets/banner-image.png";
import flowerpotSecond from "../../assets/banner-image-second.png";
import flowerpotThird from "../../assets/banner-image-third.png";

interface BannerImage {
  id: number;
  src: string;
  alt: string;
}

interface BannerGalleryProps {
  activeImage: number;
}

const bannerImages: BannerImage[] = [
  { id: 1, src: flowerpotFirst, alt: "First flowerpot image" },
  { id: 2, src: flowerpotSecond, alt: "Second flowerpot image" },
  { id: 3, src: flowerpotThird, alt: "Third flowerpot image" },
];

function BannerGallery({ activeImage }: BannerGalleryProps) {
  return (
    <div className="banner__images-holder">
      <ul className="banner__images-list">
        {bannerImages
          .filter((image) => image.id === activeImage)
          .map((image) => (
            <li className="banner__images-item" key={image.id}>
              <img
                src={image.src}
                alt={image.alt}
                className="banner__images-image"
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default BannerGallery;
