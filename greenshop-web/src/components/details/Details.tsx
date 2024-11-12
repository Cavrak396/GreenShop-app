import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import fakeData, { FakeDataTypes } from "../homepage-shop/shop/fakedata";
import DetailsProductReview from "./DetailsProductReview";
import DetailsProductPanel from "./productPanel/DetailsProductPanel";
import "./details.css";
import Portal from "../../reusable/Portal/Portal";
import DetailsProductInfo from "./productInfo/DetailsProductInfo";

function Details() {
  const { label } = useParams();
  const [item, setItem] = useState<FakeDataTypes | null>(null);
  const [isAppear, setIsAppear] = useState<boolean>(false);

  useEffect(() => {
    if (label) {
      const fetchedItem = fakeData.find((item) => item.label === label);
      setItem(fetchedItem || null);
    }
  }, [label]);

  if (!item) {
    return <p aria-live="polite">Loading...</p>;
  }

  return (
    <div className="details">
      <div className="wrap">
        <div className="details__product-info">
          <DetailsProductReview
            productImage={item.src}
            setIsAppear={setIsAppear}
          />
          <DetailsProductPanel product={item} />
        </div>
        <DetailsProductInfo product={item} />
      </div>
      {isAppear && (
        <Portal setIsAppear={setIsAppear}>
          <img src={item.src} className="details__zoomed-image" />
        </Portal>
      )}
    </div>
  );
}

export default Details;
