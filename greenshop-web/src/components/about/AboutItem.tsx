import Button from "../button/Button";
import { AboutItemProps } from "./aboutTypes";
import arrow from "../../assets/images/reusable/arrow-right.svg";

function AboutItem({ item }: AboutItemProps) {
  return (
    <li className="about__item">
      <div className="about__item-line">
        <img className="about__item-image" src={item.src} alt={item.name} />
        <div className="about__item-text">
          <h3 className="about__item-title">{item.name}</h3>
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
      </div>
    </li>
  );
}

export default AboutItem;