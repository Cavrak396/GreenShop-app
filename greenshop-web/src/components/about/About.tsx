import AboutItem from "./AboutItem";
import firstImage from "../../assets/images/about/about-first-image.png";
import secondImage from "../../assets/images/about/about-second-image.png";
import { AboutItemType } from "./aboutTypes";
import "./about.css";

const aboutItems: AboutItemType[] = [
  {
    id: 1,
    name: "Summer cactus & succulents",
    text: "We are an online plant shop offering a wide range of cheap and trendy plants",
    src: firstImage,
  },
  {
    id: 2,
    name: "Styling Trends & much more",
    text: "We are an online plant shop offering a wide range of cheap and trendy plants",
    src: secondImage,
  },
];

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
