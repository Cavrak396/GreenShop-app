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
