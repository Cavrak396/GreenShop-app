import React, { useState, useEffect } from "react";
import FormInput from "../../reusable/inputs/FormInput";
import { HeaderSearchBarProps } from "./types/headerTypes";
import { usePlants } from "../../context/PlantsContext";
import useDebounce from "../../customHooks/useDebounce";

function HeaderSearchBar({ isAppear }: HeaderSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { setSearchedData, setFilters, loadPlants } = usePlants();

  useEffect(() => {
    if (debouncedSearchQuery === "") {
      loadPlants({
        searchValue: "",
        page: 1,
        pageSize: 9,
      });
      setSearchedData("");
    } else {
      setSearchedData(debouncedSearchQuery);

      setFilters((prev) => ({
        ...prev,
        category: null,
        size: null,
        group: "",
      }));
    }
  }, [debouncedSearchQuery, setSearchedData, setFilters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <li className={`header__usertoolbar-item ${isAppear ? "visible" : ""}`}>
      <FormInput
        className="header__usertoolbar-search-bar"
        placeholder="Find your plants"
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </li>
  );
}

export default HeaderSearchBar;
