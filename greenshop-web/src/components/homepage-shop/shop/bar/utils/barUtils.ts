import { DropdownItemType, SortOptions } from "../../../types/shopTypes";
import { BarItemsTypes } from "../../../types/shopTypes";

export const dropdownItems: readonly DropdownItemType[] = [
    { id: 1, label: SortOptions.DEFAULT },
    { id: 2, label: SortOptions.LOW_PRICE },
    { id: 3, label: SortOptions.HIGH_PRICE },
    { id: 4, label: SortOptions.NAME },
];

export const barItems: BarItemsTypes[] = [
    { id: 1, label: "All Plants" },
    { id: 2, label: "New" },
    { id: 3, label: "Sale" },]