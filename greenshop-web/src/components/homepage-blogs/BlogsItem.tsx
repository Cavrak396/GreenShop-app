import React from "react";
import { BlogItemProps } from "./types/blogsTypes";
import Button from "../../reusable/button/Button";
import arrow from "../../assets/images/reusable/arrow.svg";
import BlogsImage from "./BlogsImage";
import { toast } from "react-toastify";

function BlogItem({ item }: BlogItemProps) {
  return (
    <li className="homepage-blogs__item">
      <BlogsImage item={item} />
      <span className="homepage-blogs__date">{item.time}</span>
      <span className="homepage-blogs__tag">{item.title}</span>
      <p className="homepage-blogs__lines">{item.text}</p>
      <Button
        className="homepage-blogs__button"
        onClick={() =>
          toast.info(
            "Sorry, but my developers decided I don`t need to do anything 😄"
          )
        }
      >
        <span>Read More</span>
        <img src={arrow} alt="arrow right" className="homepage-blogs__arrow" />
      </Button>
    </li>
  );
}

export default React.memo(BlogItem);
