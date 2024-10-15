import blogFirstImg from "../../../assets/images/blog-homepage/blog-image-first.png";
import blogSecondImg from "../../../assets/images/blog-homepage/blog-image-second.png";
import blogThirdImg from "../../../assets/images/blog-homepage/blog-image-third.png";
import blogFourthImg from "../../../assets/images/blog-homepage/blog-image-fourth.png";
import { BlogType } from "../blogTypes";

export const blogsInfo: BlogType[] = [
  {
    id: 1,
    image: blogFirstImg,
    time: "September 12 | Read in 6 minutes",
    title: "Cactus & Succulent Care Tips",
    text: "Cacti are succulents are easy care plants for any home or patio. ",
  },
  {
    id: 2,
    image: blogSecondImg,
    time: "September 13 | Read in 2 minutes",
    title: "Top 10 Succulents for Your Home",
    text: "Best in hanging baskets. Prefers medium to high light. ",
  },
  {
    id: 3,
    image: blogThirdImg,
    time: "September 15 | Read in 3 minutes",
    title: "Cacti & Succulent Care Tips",
    text: "Cacti and succulents thrive in containers and because most are.. ",
  },
  {
    id: 4,
    image: blogFourthImg,
    time: "September 15 | Read in 2 minutes",
    title: "Best Houseplants Room by Room",
    text: "The benefits of houseplants are endless. In addition to.. ",
  },
];
