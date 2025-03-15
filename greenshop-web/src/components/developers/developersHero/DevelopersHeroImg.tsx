import developerImage from "../../../assets/images/developers/developer-hero.webp";

function DeveloperHeroImg() {
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

export default DeveloperHeroImg;
