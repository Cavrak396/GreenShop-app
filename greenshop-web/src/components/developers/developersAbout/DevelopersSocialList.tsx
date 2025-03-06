import { DevelopersTypes } from "../types/developersTypes";
import DevelopersSocialItem from "./DevelopersSocialItem";

function DevelopersSocialList({ developer }: { developer: DevelopersTypes }) {
  return (
    <ul
      className="about__social-list"
      aria-label="List of social media profiles"
    >
      {developer.social.map((social) => (
        <DevelopersSocialItem key={social.name} social={social} />
      ))}
    </ul>
  );
}

export default DevelopersSocialList;
