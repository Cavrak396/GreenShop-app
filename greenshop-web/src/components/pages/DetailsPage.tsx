import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Details from "../details/Details";
import { ProductProvider } from "../../context/ProductContext";
import { usePlants } from "../../context/PlantsContext";
import { ProductType } from "../homepage-shop/shop/shopTypes";

function DetailsPage() {
  const { label } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const { sortedData } = usePlants();

  useEffect(() => {
    if (label && sortedData.length > 0) {
      const fetchedProduct = sortedData.find((item) => item.name === label);
      setProduct(fetchedProduct || null);
    }
  }, [label, sortedData]);

  if (!product) {
    return <p aria-live="polite">Loading...</p>;
  }

  return (
    <ProductProvider product={product}>
      <Details />
    </ProductProvider>
  );
}

export default DetailsPage;
