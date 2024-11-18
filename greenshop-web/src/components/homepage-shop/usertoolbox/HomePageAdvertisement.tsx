import advertisement from "../../../assets/images/toolbox/toolbox-advertisement.png";
import LazyImage from "../../../reusable/LazyImage/LazyImage";

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
