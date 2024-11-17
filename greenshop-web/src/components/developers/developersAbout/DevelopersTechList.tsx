import { DevelopersTypes } from "../types/developersTypes";
import DevelopersTechItem from "./DevelopersTechItem";

function DevelopersTechList({ developer }: { developer: DevelopersTypes }) {
  return (
    <ul className="about__tech-list">
      {developer.technologies.map((tech) => (
        <DevelopersTechItem key={tech.name} technology={tech} />
      ))}
    </ul>
  );
}

export default DevelopersTechList;
