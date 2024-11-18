export interface FooterNavigationTypes {
  id: number;
  text: string;
}

export interface FooterNavigationItemType {
  item: FooterNavigationTypes;
}

export interface FooterNavigationSocialTypes {
  id: number;
  name: string;
  src: string;
}

export interface FooterNavigationSocialItem {
  item: FooterNavigationSocialTypes;
}

export interface Sections {
  title: string;
  start: number;
  end: number;
}