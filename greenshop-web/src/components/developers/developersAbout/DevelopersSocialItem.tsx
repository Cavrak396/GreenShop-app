import LazyImage from "../../../reusable/lazyImage/LazyImage";
import { SocialTypes } from "../types/developersTypes";

function DevelopersSocialItem({ social }: { social: SocialTypes }) {
  return (
    <li className="about__social-item">
      <a
        href={social.link}
        target="_blank"
        rel="noopener noreferrer"
        className="about__social-link"
        aria-label={`Visit ${social.name} profile`}
      >
        <LazyImage
          src={social.icon}
          alt={social.name}
          className="about__social-image"
        />
      </a>
    </li>
  );
}

export default DevelopersSocialItem;
