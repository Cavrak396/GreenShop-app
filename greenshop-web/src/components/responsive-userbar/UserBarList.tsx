import { memo } from "react";
import UserBarItem from "./UserBarItem";
import { userBarItems } from "./utils/userBarItems";
import { useState } from "react";

function UserBarList() {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <ul className="userbar__list">
      {userBarItems.map((item) => (
        <UserBarItem
          key={item.id}
          item={item}
          isActive={activeId === item.id}
          setActiveId={setActiveId}
        />
      ))}
    </ul>
  );
}

export default memo(UserBarList);
