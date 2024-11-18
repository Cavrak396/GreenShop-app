import BannerContent from "./BannerContent";
import BannerGallery from "./BannerGallery";
import { bannerImages } from "./utils/bannerUtils";
import BannerDots from "./BannerDots";
import { useEffect, useState } from "react";

function Banner() {
  const [activeImage, setActiveImage] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev === bannerImages.length ? 1 : prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="banner">
      <div className="wrap">
        <div className="banner__line">
          <BannerContent />
          <BannerGallery activeImage={activeImage} />
          <BannerDots
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            images={bannerImages}
          />
        </div>
      </div>
    </section>
  );
}

export default Banner;
