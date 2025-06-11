import facebook from "../../../assets/images/reusable/Facebook.svg";
import twiter from "../../../assets/images/reusable/Twitter.svg";
import linkedin from "../../../assets/images/reusable/Linkedin.svg";
import union from "../../../assets/images/reusable/Union.svg";
import bin from "../../../assets/images/reusable/bin.svg";
import edit from "../../../assets/images/reusable/edit.svg";
import { ProductTypeDetails } from "../types/detailsTypes";
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

export function getProductDescriptions(product: ProductTypeDetails) {
  return [
    { label: "Long description", value: product.long_Description },
    { label: "Living room description", value: product.livingRoom_Description },
    { label: "Dining room description", value: product.diningRoom_Description },
  ].filter(desc => desc.value);
}

export function calculateRatingPercentages(ratingNumbers: { [key: number]: number }) {
  const totalVotes = Object.values(ratingNumbers).reduce(
    (total, count) => total + count,
    0
  );

  if (totalVotes === 0) return [];

  return Object.keys(ratingNumbers).map((rating) => {
    const count = ratingNumbers[parseInt(rating)];
    const percentage = (count / totalVotes) * 100;
    return { rating: parseInt(rating), percentage };
  });
}

export function calculateAverageRating(ratings: Comment[]) {
  if (!Array.isArray(ratings)) {
    return 0;
  }

  const totalRating = ratings.reduce((acc, { rating }) => acc + rating, 0);
  return ratings.length > 0 ? totalRating / ratings.length : 0;
}

export function createCartItem(
  product: ProductTypeDetails,
  getShopImage: (img: string) => string,
  date: Date = new Date()
): CartItemTypes {
  return {
    id: product.plantId,
    label: product.name,
    price: product.price,
    sale: product.sale_Percent,
    privateSale: product.sale_Percent_Private,
    sale_Percent: product.sale_Percent,
    sale_Percent_Private: product.sale_Percent_Private,
    src: getShopImage(product.image),
    alt: `Image of ${product.name}`,
    dateAdded: date,
  };
}