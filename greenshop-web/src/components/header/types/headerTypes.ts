export interface NavigationItem {
  id: number;
  label: string;
}

export interface HeaderNavItemProps {
  id: number;
  label: string;
  activeLink: number;
  handleLinkClick: (id: number) => void;
}

export interface ToolbarItem {
  id: number;
  src: string;
  alt: string;
}

export interface ToolbarItemProps {
  src: string;
  alt: string;
  setIsAppear: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HeaderSearchBarProps {
  isAppear: boolean;
}
