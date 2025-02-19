import HomePageShopBar from "./bar/HomePageShopBar";
import HomePageShopArticles from "./articles/HomePageShopArticles";
import ErrorMessage from "../../../reusable/error/ErrorMessage";
import { usePlants } from "../../../context/PlantsContext";
import LoadingSpinner from "../../../reusable/LoadingSpinner/LoadingSpinner";

function HomePageShopContent() {
  const { sortedData, loading, error } = usePlants();

  return (
    <div className="homepageshop__content">
      {loading && <LoadingSpinner />}
      {error && (
        <ErrorMessage className="homepageshop__content-error" message={error} />
      )}
      <HomePageShopBar />
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