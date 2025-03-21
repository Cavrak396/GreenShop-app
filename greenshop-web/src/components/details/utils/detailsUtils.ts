import facebook from "../../../assets/images/reusable/Facebook.svg";
import twiter from "../../../assets/images/reusable/Twitter.svg";
import linkedin from "../../../assets/images/reusable/Linkedin.svg";
import union from "../../../assets/images/reusable/Union.svg";
import bin from "../../../assets/images/reusable/bin.svg";
import edit from "../../../assets/images/reusable/edit.svg";
import { CartItemTypes } from "../../cart/types/cartTypes";
import { Comment } from "../../../context/types/reviewsTypes";
import { ButtonOrSizeType, SocialMediaType, DetailsPersonalToolsType } from "../types/detailsTypes";

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

export const detailsPersonalCommentTools: DetailsPersonalToolsType[] = [
  { id: 1, alt: 'Edit', src: edit },
  { id: 2, alt: 'Delete', src: bin },
]

export const infoButtons: ButtonOrSizeType[] = [
  { id: 1, text: "Product Description" },
  { id: 2, text: "Reviews" },
];

export function calculateRatingPercentages(comments: Comment[]) {
  const totalComments = comments.length;

  const ratingsCount = Array(5).fill(0);

  comments.forEach(({ rating }) => {
    if (rating >= 1 && rating <= 5) {
      ratingsCount[rating - 1]++;
    }
  });

  return ratingsCount.map((count, index) => ({
    rating: index + 1,
    count,
    percentage: totalComments ? (count / totalComments) * 100 : 0,
  }));
}


export function calculateAverageRating(comments: Comment[]) {
  if (!Array.isArray(comments)) {
    console.error("Comments nije niz:", comments);
    return 0;
  }

  const totalRating = comments.reduce((acc, { rating }) => acc + rating, 0);
  return comments.length > 0 ? totalRating / comments.length : 0;
}

export const createCartItem = (product: any, dateAdded: Date): CartItemTypes => {
  const { plantId, name, price, image } = product;

  return {
    id: plantId,
    label: name,
    price,
    src: image,
    alt: `Image of ${name}`,
    dateAdded,
  };
};