import MainTitle from "../../reusable/titles/MainTitle";
import Button from "../../reusable/button/Button";
import BannerText from "./BannerText";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./banner.css";

function BannerContent() {
  function handleInfoClick() {
    toast.info(
      "Sorry, but my developers decided I don`t need to do anything 😄"
    );
  }

  return (
    <div className="banner__content-holder">
      <span className="banner__title-above">Welcome to greenshop</span>
      <MainTitle className="banner__title">
        Let's Make a Better
        <span className="banner__title-colored">Planet</span>
      </MainTitle>
      <BannerText />
      <Button className="banner__button button" onClick={handleInfoClick}>
        Shop Now
      </Button>

      <ToastContainer />
    </div>
  );
}

export default BannerContent;
