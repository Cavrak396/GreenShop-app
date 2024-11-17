import developerImage from "../../../assets/images/developers/developer-hero.png";

function DeveloperHeroImage() {
  return (
    <div className="hero__image-holder">
      <img
        src={developerImage}
        className="developer__hero-image"
        alt="developer hero image"
      />
    </div>
  );
}

export default DeveloperHeroImage;
