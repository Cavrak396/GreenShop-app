import FormInput from "../../reusable/inputs/FormInput";
import { HeaderSearchBarProps } from "./types/headerTypes";

function HeaderSearchBar({ isAppear }: HeaderSearchBarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Search query:", e.target.value);
  };

  return (
    <li className={`header__usertoolbar-item ${isAppear ? "visible" : ""}`}>
      <FormInput
        className="header__usertoolbar-search-bar"
        placeholder="Find your plants"
        type="text"
        onChange={handleInputChange}
      />
    </li>
  );
}

export default HeaderSearchBar;
