import MainTitle from "../../reusable/titles/MainTitle";
import Button from "../../reusable/button/Button";
import "./banner.css";
import BannerText from "./BannerText";

function BannerContent() {
  return (
    <div className="banner__content-holder">
      <span className="banner__title-above">Welcome to greenshop</span>
      <MainTitle className="banner__title">
        Let's Make a Better
        <span className="banner__title-colored">Planet</span>
      </MainTitle>
      <BannerText />
      <Button className="banner__button button">Shop Now</Button>
    </div>
  );
}

export default BannerContent;
