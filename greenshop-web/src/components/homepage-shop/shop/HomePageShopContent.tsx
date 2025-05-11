import HomePageShopBar from "./bar/HomePageShopBar";
import HomePageShopArticles from "./articles/HomePageShopArticles";
import ErrorMessage from "../../../reusable/error/ErrorMessage";
import { usePlants } from "../../../context/PlantsContext";
import { ShopPagePropType } from "../types/shopTypes";
import LoadingSpinner from "../../../reusable/loadingSpinner/LoadingSpinner";

function HomePageShopContent({ setCurrentShopPage }: ShopPagePropType) {
  const { sortedData, loading, error } = usePlants();

  return (
    <div className="homepageshop__content">
      {loading && <LoadingSpinner />}
      {error && (
        <ErrorMessage className="homepageshop__content-error" message={error} />
      )}
      <HomePageShopBar setCurrentShopPage={setCurrentShopPage} />
      {!loading && !error && sortedData.length === 0 && (
        <ErrorMessage
          className="homepageshop__content-error"
          message={"No products match the selected filters."}
        />
      )}
      {!loading && !error && sortedData.length > 0 && (
        <HomePageShopArticles sortedData={sortedData} />
      )}
    </div>
  );
}

export default HomePageShopContent;
