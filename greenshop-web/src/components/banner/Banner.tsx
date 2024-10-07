import BannerContent from "./BannerContent";
import BannerGallery from "./BannerGallery";
import BannerDots from "./BannerDots";
import { useEffect, useState } from "react";

function Banner() {
  const [activeImage, setActiveImage] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev === 3 ? 1 : prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [activeImage]);

  return (
    <section className="banner">
      <div className="wrap">
        <div className="banner__line">
          <BannerContent />
          <BannerGallery activeImage={activeImage} />
          <BannerDots
            activeImage={activeImage}
            setActiveImage={setActiveImage}
          />
        </div>
      </div>
    </section>
  );
}

export default Banner;
