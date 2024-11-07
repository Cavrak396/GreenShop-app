import { memo } from "react";
import { userBarItemType } from "./types/userBarTypes";

function UserBarItem({ item, isActive, setActiveId }: userBarItemType) {
  return (
    <li
      onClick={() => setActiveId(item.id)}
      className={`userbar__list-item ${isActive ? "activated-page" : ""} ${
        item.specialClass ? "userbar__list-item--lighter" : ""
      }`}
    >
      <a
        href="#"
        className="userbar__list-link"
        onClick={(e) => e.preventDefault()}
      >
        <img src={item.src} alt={item.alt} className="userbar__list-image" />
      </a>
    </li>
  );
}

export default memo(UserBarItem);
