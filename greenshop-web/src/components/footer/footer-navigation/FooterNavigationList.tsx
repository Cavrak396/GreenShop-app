import FooterNavigationItem from "./FooterNavigationItem";
import { footerNavigationLinks, sections } from "./utils/footerNavigationUtils";
import Title from "../../../reusable/titles/Title";

function FooterNavigationList() {
  return (
    <div className="footer__navigation-lists">
      {sections.map((section, index) => (
        <ul key={index} className="footer__navigation-list">
          <Title className="footer__navigation-title small-title">
            {section.title}
          </Title>
          {footerNavigationLinks
            .slice(section.start, section.end)
            .map((item) => (
              <FooterNavigationItem key={item.id} item={item} />
            ))}
        </ul>
      ))}
    </div>
  );
}

export default FooterNavigationList;
