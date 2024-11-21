import { useProduct } from "../../context/ProductContext";
import { useState } from "react";
import DetailsProductReview from "./DetailsProductReview";
import DetailsProductPanel from "./productPanel/DetailsProductPanel";
import Portal from "../../reusable/Portal/Portal";
import DetailsProductInfo from "./productInfo/DetailsProductInfo";
import "./details.css";

function Details() {
  const product = useProduct();
  const [isAppear, setIsAppear] = useState<boolean>(false);

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
          <img src={product.src} className="details__zoomed-image" />
        </Portal>
      )}
    </section>
  );
}

export default Details;
