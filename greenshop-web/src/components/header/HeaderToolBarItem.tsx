import "./header.css";
import Button from "../button/Button";

interface ToolbarItemProps {
  src: string;
  alt: string;
}

function HeaderToolbarItem(props: ToolbarItemProps) {
  const { src, alt } = props;

  return (
    <li className="header__usertoolbar-item">
      <Button className="header__usertoolbar-button">
        <img src={src} alt={alt} className="header__usertoolbar-image" />
      </Button>
    </li>
  );
}

export default HeaderToolbarItem;
