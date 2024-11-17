import { DevelopersTypes } from "../types/developersTypes";
import DevelopersSocialList from "./DevelopersSocialList";
import DevelopersTechList from "./DevelopersTechList";
import Button from "../../button/Button";
import { useState } from "react";
import useIsMobile from "../../../customHooks/useIsMobile";

function DevelopersAboutItem({ developer }: { developer: DevelopersTypes }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  const MAX_TEXT_LENGTH = 250;

  return (
    <li className="about__list-item">
      <img
        src={developer.image}
        alt={developer.alt}
        className="about__item-developer-image"
      />
      <span className="about__item-developer">{developer.name}</span>
      <span className="about__item-developer-job">{developer.job}</span>
      <DevelopersTechList developer={developer} />
      <p className="about__item-developer-text">
        {isMobile && !isExpanded
          ? `${developer.text.slice(0, MAX_TEXT_LENGTH)}...`
          : developer.text}
      </p>
      {isMobile && (
        <Button
          className="about__item-developer-button"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "View Less" : "View More"}
        </Button>
      )}
      <DevelopersSocialList developer={developer} />
    </li>
  );
}

export default DevelopersAboutItem;
