import {
  FooterNavigationTypes,
  FooterNavigationSocialTypes,
} from "../types/footerNavigationTypes";
import facebook from "../../../../assets/images/reusable/Facebook.svg";
import instagram from "../../../../assets/images/reusable/Instagram.svg";
import twitter from "../../../../assets/images/reusable/Twitter.svg";
import linkedin from "../../../../assets/images/reusable/Linkedin.svg";
import union from "../../../../assets/images/reusable/Union.svg";

export const footerNavigationLinks: FooterNavigationTypes[] = [
  { id: 1, text: "My Account" },
  { id: 2, text: "Our Stories" },
  { id: 3, text: "Contact Us" },
  { id: 4, text: "Career" },
  { id: 5, text: "Specials" },
  { id: 6, text: "Help Center" },
  { id: 7, text: "How to Buy" },
  { id: 8, text: "Shipping and Delievery" },
  { id: 9, text: "Product Policy" },
  { id: 10, text: "How to Return" },
  { id: 11, text: "House Plants" },
  { id: 12, text: "Potter Plants" },
  { id: 13, text: "Seeds" },
  { id: 14, text: "Small Plants" },
  { id: 15, text: "Accessories" },
];

export const footerNavigationSocial: FooterNavigationSocialTypes[] = [
  { id: 1, name: "facebook", src: facebook },
  { id: 2, name: "instagram", src: instagram },
  { id: 3, name: "twitter", src: twitter },
  { id: 4, name: "linkedin", src: linkedin },
  { id: 5, name: "union", src: union },
];
