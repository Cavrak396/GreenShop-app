import facebook from "../../../assets/images/reusable/Facebook.svg";
import twiter from "../../../assets/images/reusable/Twitter.svg";
import linkedin from "../../../assets/images/reusable/Linkedin.svg";
import union from "../../../assets/images/reusable/Union.svg";
import { ButtonOrSizeType, SocialMediaType } from "../types/detailsTypes";

export const sizes: ButtonOrSizeType[] = [
  { id: 1, text: "S" },
  { id: 2, text: "M" },
  { id: 3, text: "L" },
  { id: 4, text: "XL" },
];

export const userButtons: ButtonOrSizeType[] = [
  { id: 1, text: "Buy now" },
  { id: 2, text: "Add to cart" },
];

export const detailsSocialMedia: SocialMediaType[] = [
  { id: 1, alt: "facebook", src: facebook },
  { id: 2, alt: "twitter", src: twiter },
  { id: 3, alt: "linkedin", src: linkedin },
  { id: 4, alt: "union", src: union },
];

export const infoButtons: ButtonOrSizeType[] = [
  { id: 1, text: "Product Description" },
  { id: 2, text: "Reviews" },
];
