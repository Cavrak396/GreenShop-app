import DevelopersHeroSection from "./developersHero/DevelopersHeroSection";
import "./developers.css";

function Developers() {
  return (
    <section className="developers">
      <div className="wrap">
        <DevelopersHeroSection />
      </div>
    </section>
  );
}

export default Developers;