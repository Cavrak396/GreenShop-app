import { blogsInfo } from "./utils/blogsUtils";
import BlogsItem from "./BlogsItem";

function BlogsItemList() {
  return (
    <ul className="homepage-blogs__list">
      {blogsInfo.map((item) => {
        return <BlogsItem item={item} key={item.id} />;
      })}
    </ul>
  );
}

export default BlogsItemList;
