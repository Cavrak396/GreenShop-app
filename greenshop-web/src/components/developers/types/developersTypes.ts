export interface TechnologyTypes {
  name: string;
  icon: string;
}

export interface SocialTypes {
  name: string;
  icon: string;
  link: string;
}

export interface DevelopersTypes {
  id: number;
  name: string;
  job: string;
  image: string;
  technologies: TechnologyTypes[];
  social: SocialTypes[];
  alt: string;
  text: string;
}
