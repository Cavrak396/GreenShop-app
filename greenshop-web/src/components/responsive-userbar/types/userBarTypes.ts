export interface userBarTypes {
  id: number;
  alt: string;
  src: string;
  path?: string;
  specialClass: boolean;
}

export interface userBarItemType {
  item: userBarTypes;
  isActive: boolean;
  setActiveId: React.Dispatch<React.SetStateAction<number>>;
  activePortal: string | null;
  setActivePortal: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface navigationTypes {
  item: userBarTypes,
  setActiveId: React.Dispatch<React.SetStateAction<number>>,
  setActivePortal: React.Dispatch<React.SetStateAction<string | null>>,
  token: string | null,
  navigate: (path: string) => void
}