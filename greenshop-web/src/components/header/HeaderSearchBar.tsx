import FormInput from "../../reusable/inputs/FormInput";

function HeaderSearchBar({ isAppear }) {
  return (
    <li className={`header__usertoolbar-item ${isAppear ? "visible" : ""}`}>
      <FormInput
        className="header__usertoolbar-search-bar"
        placeholder="Search for plant..."
        type="text"
      />
    </li>
  );
}

export default HeaderSearchBar;
