import { useState } from "react";
import DetailsProductReview from "./DetailsProductReview";
import DetailsProductPanel from "./productPanel/DetailsProductPanel";
import Portal from "../../reusable/portal/Portal";
import DetailsProductInfo from "./productInfo/DetailsProductInfo";
import { useProduct } from "../../context/ProductContext";
import { usePlants } from "../../context/PlantsContext";
import "./details.css";

function Details() {
  const [isAppear, setIsAppear] = useState<boolean>(false);
  const product = useProduct();
  const { getShopImage } = usePlants();

  return (
    <section className="details">
      <div className="wrap">
        <div className="details__product-info">
          <DetailsProductReview setIsAppear={setIsAppear} />
          <DetailsProductPanel />
        </div>
        <DetailsProductInfo />
      </div>
      {isAppear && (
        <Portal setIsAppear={setIsAppear}>
          <img
            src={getShopImage(product.image)}
            className="details__zoomed-image"
          />
        </Portal>
      )}
    </section>
  );
}

export default Details;