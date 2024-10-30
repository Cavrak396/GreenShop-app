import FooterNavigationItem from "./FooterNavigationItem";
import { footerNavigationLinks } from "./utils/footerNavigationLinks";
import Title from "../../../reusable/Title";

const sections = [
  { title: "My Account", start: 0, end: 5 },
  { title: "Helps & Guide", start: 5, end: 10 },
  { title: "Categories", start: 10, end: 15 },
];

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
