import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import fakeData, { FakeDataTypes } from "../homepage-shop/shop/fakedata";
import Details from "../details/Details";
import { ProductProvider } from "../../context/ProductContext";

function DetailsPage() {
  const { label } = useParams();
  const [product, setProduct] = useState<FakeDataTypes | null>(null);

  useEffect(() => {
    if (label) {
      const fetchedProduct = fakeData.find((item) => item.label === label);
      setProduct(fetchedProduct || null);
    }
  }, [label]);

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
