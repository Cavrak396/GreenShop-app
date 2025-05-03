import LazyImage from "../../../reusable/lazyImage/LazyImage";
import { TechnologyTypes } from "../types/developersTypes";

function DevelopersTechItem({ technology }: { technology: TechnologyTypes }) {
  return (
    <li className="about__tech-item">
      <LazyImage
        src={technology.icon}
        alt={technology.name}
        className="about__tech-image"
      />
    </li>
  );
}

export default DevelopersTechItem;
