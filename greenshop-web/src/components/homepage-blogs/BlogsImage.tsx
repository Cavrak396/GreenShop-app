import { BlogItemProps } from "./types/blogsTypes";

function BlogsImage({ item }: BlogItemProps) {
  return (
    <img src={item.image} alt={item.title} className="homepage-blogs__image" />
  );
}

export default BlogsImage;
