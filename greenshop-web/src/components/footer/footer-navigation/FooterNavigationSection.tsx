import { sections } from "./utils/footerNavigationUtils";
import Title from "../../../reusable/titles/Title";
import FooterNavigationList from "./FooterNavigationList";

function FooterNavigationSection() {
  return (
    <div className="footer__navigation-lists">
      {sections.map((section, index) => (
        <div key={index} className="footer__navigation-list">
          <Title className="footer__navigation-title small-title">
            {section.title}
          </Title>
          <FooterNavigationList section={section} />
        </div>
      ))}
    </div>
  );
}

export default FooterNavigationSection;
