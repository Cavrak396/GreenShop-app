import { footerNavigationLinks } from "./utils/footerNavigationUtils";
import FooterNavigationItem from "./FooterNavigationItem";
import { FooterNavigationListProps } from "./types/footerNavigationTypes";

function FooterNavigationList({ section }: FooterNavigationListProps) {
  return (
    <ul role="list">
      {footerNavigationLinks.slice(section.start, section.end).map((item) => (
        <FooterNavigationItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default FooterNavigationList;
