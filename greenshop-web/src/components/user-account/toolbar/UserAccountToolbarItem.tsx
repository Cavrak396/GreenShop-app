import { UserToolbarItemType } from "../types/userAccountTypes";

function UserAccountToolbarItem({
  item,
  isActive,
  setIsActive,
}: UserToolbarItemType) {
  const handleClick = () => {
    setIsActive(item.id);
  };

  return (
    <li
      className={`useraccount__toolbox-item ${
        isActive === item.id ? "useraccount__toolbox-item--active" : ""
      }`}
      onClick={handleClick}
    >
      {item.title}
    </li>
  );
}

export default UserAccountToolbarItem;
