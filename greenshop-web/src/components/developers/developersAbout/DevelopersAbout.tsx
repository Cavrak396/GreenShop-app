import DevelopersAboutIntro from "./DevelopersAboutIntro";
import DevelopersAboutList from "./DevelopersAboutList";

function DevelopersAbout() {
  return (
    <section className="about about--developer">
      <div className="wrap">
        <DevelopersAboutIntro />
        <DevelopersAboutList />
      </div>
    </section>
  );
}

export default DevelopersAbout;
