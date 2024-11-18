import BlogsItemList from "./BlogsItemList";
import BlogsText from "./BlogsText";
import "./blogs.css";

function Blogs() {
  return (
    <section className="homepage-blogs">
      <div className="wrap">
        <BlogsText />
        <BlogsItemList />
      </div>
    </section>
  );
}

export default Blogs;
