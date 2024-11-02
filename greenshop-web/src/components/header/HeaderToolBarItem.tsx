import "./header.css";
import Button from "../button/Button";

interface ToolbarItemProps {
  src: string;
  alt: string;
  setIsAppear: React.Dispatch<React.SetStateAction<boolean>>;
}

function HeaderToolbarItem({ src, alt, setIsAppear }: ToolbarItemProps) {
  function handleSearchBarAppear() {
    if (alt === "Search") setIsAppear((prev) => !prev);
  }

  return (
    <li className="header__usertoolbar-item">
      <Button
        className="header__usertoolbar-button"
        onClick={() => handleSearchBarAppear()}
      >
        <img src={src} alt={alt} className="header__usertoolbar-image" />
      </Button>
    </li>
  );
}

export default HeaderToolbarItem;
