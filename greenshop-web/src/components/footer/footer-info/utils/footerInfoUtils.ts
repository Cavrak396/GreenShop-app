import { FooterInfoTypes } from "../types/footerInfo";
import location from "../../../../assets/images/footer/footer-location.svg";
import call from "../../../../assets/images/footer/footer-call.svg";
import mail from "../../../../assets/images/footer/footer-message.svg";

export const footerInfos: FooterInfoTypes[] = [
  {
    id: 1,
    imageSrc: location,
    alt: 'footer image',
    text: "70 West Buckingham Ave. Farmingdale, NY 11735",
  },
  {
    id: 2,
    imageSrc: mail,
    alt: 'footer image',
    text: "contact@greenshop.com",
  },
  {
    id: 3,
    alt: 'footer image',
    imageSrc: call,
    text: "+88 01911 717 490",
  },
];
