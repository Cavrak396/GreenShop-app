import { memo, useState } from "react";
import UserBarItem from "./UserBarItem";
import { userBarItems } from "./utils/userBarUtils";

function UserBarList() {
  const [activeId, setActiveId] = useState<number>(1);
  const [activePortal, setActivePortal] = useState<string | null>(null);

  return (
    <ul className="userbar__list">
      {userBarItems.map((item) => (
        <UserBarItem
          key={item.id}
          item={item}
          isActive={activeId === item.id}
          setActiveId={setActiveId}
          activePortal={activePortal}
          setActivePortal={setActivePortal}
        />
      ))}
    </ul>
  );
}

export default memo(UserBarList);
