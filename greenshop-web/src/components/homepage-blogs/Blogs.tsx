import BlogItem from "./BlogItem";
import BlogsText from "./BlogsText";
import { blogsInfo } from "./utils/blogsUtils";
import "./blogs.css";

function Blogs() {
  return (
    <section className="homepage-blogs">
      <div className="wrap">
        <BlogsText />
        <ul className="homepage-blogs__list">
          {blogsInfo.map((item) => {
            return <BlogItem item={item} key={item.id} />;
          })}
        </ul>
      </div>
    </section>
  );
}

export default Blogs;
