import facebook from "../../../assets/images/reusable/Facebook.svg";
import twiter from "../../../assets/images/reusable/Twitter.svg";
import linkedin from "../../../assets/images/reusable/Linkedin.svg";
import union from "../../../assets/images/reusable/Union.svg";
import { ButtonOrSizeType, CommentsType, SocialMediaType, RatingsCountType } from "../types/detailsTypes";

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

// Fake data, waiting for API
export const comments: CommentsType[] = [
  { id: 1, username: 'Jone Jones', comment: 'I can t smoke this, why?', rate: 3 },
  { id: 2, username: 'Milorad Dodik', comment: 'Ok je, moze da prodje', rate: 4 },
  { id: 3, username: 'Jovana Jeremic', comment: 'Ne mogu da uvijem sarmu sa ovim, zasto?', rate: 1 },
  { id: 4, username: 'Strahinja', comment: 'Ja sam Strahinja', rate: 5 },
  { id: 5, username: 'Mike', comment: 'Thats great zbidelj', rate: 5 },
  { id: 6, username: 'Cavrak', comment: 'Ja pravim app tako da je meni ok sve', rate: 5 },
]


export function calculateRatingPercentages(comments: CommentsType[]) {
  const totalComments = comments.length;

  const ratingsCount: RatingsCountType = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  comments.forEach(({ rate }) => {
    if (rate >= 1 && rate <= 5) {
      ratingsCount[rate] = (ratingsCount[rate] || 0) + 1;
    }
  });

  return Object.entries(ratingsCount).map(([rating, count]) => ({
    rating: Number(rating),
    count,
    percentage: totalComments > 0 ? (count / totalComments) * 100 : 0,
  }));
}

export function calculateAverageRating(comments: CommentsType[]) {
  const totalRating = comments.reduce((acc, { rate }) => acc + rate, 0);
  return comments.length > 0 ? totalRating / comments.length : 0;
}