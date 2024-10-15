import React from "react";
import { BlogType } from "./blogTypes";
import Button from "../button/Button";
import arrow from "../../assets/images/reusable/arrow-right.svg";

interface BlogItemProps {
  item: BlogType;
}

function BlogItem({ item }: BlogItemProps) {
  return (
    <li className="homepage-blogs__item">
      <img
        src={item.image}
        alt={item.title}
        className="homepage-blogs__image"
      />
      <span className="homepage-blogs__date">{item.time}</span>
      <span className="homepage-blogs__tag">{item.title}</span>
      <p className="homepage-blogs__lines">{item.text}</p>
      <Button className="homepage-blogs__button">
        <span>Read More</span>
        <img src={arrow} alt="arrow right" className="homepage-blogs__arrow" />
      </Button>
    </li>
  );
}

export default React.memo(BlogItem);
