import { ConfirmationTypes } from "../../reusable/types/confirmationTypes";

export type LogoutProps = ConfirmationTypes & {
    setOnConfirmAction: (action: () => void) => void;
    logout: () => void;
};

export interface MenuType {
    id: number;
    title: string;
}

export interface UserToolbarType {
    isActive: number;
    setIsActive: (id: number) => void;
}

export interface UserToolbarItemType extends UserToolbarType {
    item: MenuType;
}
