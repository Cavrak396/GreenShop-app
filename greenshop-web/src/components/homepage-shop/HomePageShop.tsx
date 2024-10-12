import HomePageToolbox from "./usertoolbox/HomePageToolbox";
import HomePageShopContent from "./shop/HomePageShopContent";
import "./homepageshop.css";

function HomePageShop() {
  return (
    <div className="homepageshop">
      <div className="wrap">
        <div className="homepageshop__line">
          <HomePageToolbox />
          <HomePageShopContent />
        </div>
      </div>
    </div>
  );
}

export default HomePageShop;
