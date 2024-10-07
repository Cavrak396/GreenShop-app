import Button from "../button/Button";
import "./banner.css";

function BannerContent() {
  return (
    <div className="banner__content-holder">
      <span className="banner__title-above">Welcome to greenshop</span>
      <h1 className="banner__title">
        Let's Make a Better{" "}
        <span className="banner__title-colored">Planet</span>
      </h1>
      <p className="banner__lines">
        We are an online plant shop offering a wide range{" "}
        <span className="banner__lines-responsive">
          of cheap and trendy plants. Use our plants to create an unique Urban
          Jungle. Order your favorite plants!
        </span>
      </p>
      <Button className="banner__button button">Shop Now</Button>
    </div>
  );
}

export default BannerContent;
