import { memo } from "react";
import "./userbar.css";
import UserBarList from "./UserBarList";

function UserBar() {
  return (
    <nav className="userbar__navigation">
      <UserBarList />
    </nav>
  );
}

export default memo(UserBar);
