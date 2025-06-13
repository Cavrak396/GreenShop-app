import Button from "../../reusable/button/Button";
import arrow from "../../assets/images/reusable/arrow.svg";
import { AboutItemProps } from "./types/aboutTypes";
import Title from "../../reusable/titles/Title";

function AboutItemText({ item }: AboutItemProps) {
  return (
    <div className="about__item-text">
      <Title className="about__item-title middle-title">{item.name}</Title>
      <p className="about__item-lines">{item.text}</p>
      <Button className="about__item-button button">
        <span>Find More</span>
        <img
          src={arrow}
          alt="arrow right"
          className="about__item-button-arrow"
        />
      </Button>
    </div>
  );
}

export default AboutItemText;