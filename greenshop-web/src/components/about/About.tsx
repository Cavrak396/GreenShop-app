import AboutItem from "./AboutItem";
import { aboutItems } from "./utils/aboutUtils";
import "./about.css";

function About() {
  return (
    <section className="about">
      <div className="wrap">
        <ul className="about__list">
          {aboutItems.map((item) => {
            return <AboutItem key={item.id} item={item} />;
          })}
        </ul>
      </div>
    </section>
  );
}

export default About;