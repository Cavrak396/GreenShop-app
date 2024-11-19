import DeveloperHeroImg from "./DevelopersHeroImg";
import DevelopersHeroAbstract from "./DevelopersHeroAbstract";

function DevelopersHeroSection() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero__line">
          <DevelopersHeroAbstract />
          <DeveloperHeroImg />
        </div>
      </div>
    </section>
  );
}

export default DevelopersHeroSection;