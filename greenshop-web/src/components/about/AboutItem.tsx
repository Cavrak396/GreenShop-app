import { AboutItemProps } from "./types/aboutTypes";
import AboutItemImage from "./AboutItemImage";
import AboutItemText from "./AboutItemText";

function AboutItem({ item }: AboutItemProps) {
  return (
    <li className="about__item">
      <div className="about__item-line">
        <AboutItemImage src={item.src} alt={item.name} />
        <AboutItemText item={item} />
      </div>
    </li>
  );
}

export default AboutItem;
