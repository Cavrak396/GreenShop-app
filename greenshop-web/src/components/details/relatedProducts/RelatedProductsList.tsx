import { useParams } from "react-router-dom";
import { usePlants } from "../../../context/PlantsContext";
import { useEffect } from "react";
import RelatedProductsItem from "./RelatedProductsItem";

function RelatedProductsList() {
  const { id } = useParams();
  const { getRelatedProducts, relatedProducts } = usePlants();

  useEffect(() => {
    if (id) {
      getRelatedProducts(id, 5);
    }
  }, [id]);

  return (
    <ul className="details__related-products-list">
      {relatedProducts.map((item) => {
        return <RelatedProductsItem item={item} key={item.plantId} />;
      })}
    </ul>
  );
}

export default RelatedProductsList;
