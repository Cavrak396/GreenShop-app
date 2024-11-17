import DeveloperHeroImage from "./DeveloperHeroImage";
import DevelopersHeroText from "./DeveloperHeroText";

function DevelopersHero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero__line">
          <DevelopersHeroText />
          <DeveloperHeroImage />
        </div>
      </div>
    </section>
  );
}

export default DevelopersHero;
