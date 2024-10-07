import Button from "../button/Button";
import magnifier from "../../assets/images/magnifier.png";
import cart from "../../assets/images/cart.png";
import login from "../../assets/images/login-icon.png";

interface ToolbarItem {
  id: number;
  src: string;
  alt: string;
}

const toolbarItems: ToolbarItem[] = [
  { id: 1, src: magnifier, alt: "Search" },
  { id: 2, src: cart, alt: "Cart" },
];

function HeaderUserToolbar() {
  return (
    <ul className="header__usertoolbar-list">
      {toolbarItems.map((item) => (
        <li className="header__usertoolbar-item" key={item.id}>
          <Button className="header__usertoolbar-button">
            <img
              src={item.src}
              alt={item.alt}
              className="header__usertoolbar-image"
            />
          </Button>
        </li>
      ))}
      <li className="header__usertoolbar-item">
        <Button className="header__usertoolbar-button button">
          <img src={login} alt="Login icon" />
          Login
        </Button>
      </li>
    </ul>
  );
}

export default HeaderUserToolbar;
