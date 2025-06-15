import Title from "../../../reusable/titles/Title";
import RelatedProductsList from "./RelatedProductsList";

function RelatedProducts() {
  return (
    <div className="details__related-products">
      <Title className="details__related-products-title small-title">
        Related Products
      </Title>
      <RelatedProductsList />
    </div>
  );
}

export default RelatedProducts;
