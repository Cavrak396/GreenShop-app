import advertisement from "../../../assets/images/toolbox/toolbox-advertisement.png";

function HomePageAdvertisement() {
  return (
    <div className="homepageshop__advertisement-container">
      <img
        src={advertisement}
        className="homepageshop__advertisement-image"
        alt="advertisement"
      />
    </div>
  );
}

export default HomePageAdvertisement;
