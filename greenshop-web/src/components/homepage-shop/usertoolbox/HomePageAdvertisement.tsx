import advertisement from "../../../assets/images/toolbox/toolbox-advertisement.webp";
import LazyImage from "../../../reusable/lazyImage/LazyImage";

function HomePageAdvertisement() {
  return (
    <div className="homepageshop__advertisement-container">
      <LazyImage
        src={advertisement}
        className="homepageshop__advertisement-image"
        alt="advertisement"
      />
    </div>
  );
}

export default HomePageAdvertisement;
