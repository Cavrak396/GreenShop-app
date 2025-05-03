import LazyImage from "../../reusable/lazyImage/LazyImage";
import { BlogItemProps } from "./types/blogsTypes";

function BlogsImage({ item }: BlogItemProps) {
  return (
    <LazyImage
      src={item.image}
      alt={item.title}
      className="homepage-blogs__image"
    />
  );
}

export default BlogsImage;
