import DevelopersAboutItem from "./DevelopersAboutItem";
import { developersInfo } from "./utils/developersUtils";

function DevelopersAboutList() {
  return (
    <ul className="about__list">
      {developersInfo.map((developer) => {
        return <DevelopersAboutItem key={developer.id} developer={developer} />;
      })}
    </ul>
  );
}

export default DevelopersAboutList;
