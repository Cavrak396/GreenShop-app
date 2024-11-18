export interface AboutItemType {
  id: number;
  name: string;
  text: string;
  src: string;
}

export interface AboutItemProps {
  item: AboutItemType;
}

export interface AboutItemImageProps {
  src: string;
  alt: string;
}
