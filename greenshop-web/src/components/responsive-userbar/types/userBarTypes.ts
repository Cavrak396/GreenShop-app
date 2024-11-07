export interface userBarTypes {
  id: number;
  alt: string;
  src: string;
  specialClass: boolean;
}

export interface userBarItemType {
  item: userBarTypes;
  isActive: boolean;
  setActiveId: React.Dispatch<React.SetStateAction<number>>;
}
