import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Details from "../details/Details";
import { ProductProvider } from "../../context/ProductContext";
import { fetchPlantById } from "../../services/plants/plants";
import LoadingSpinner from "../../reusable/loadingSpinner/LoadingSpinner";
import ErrorMessage from "../../reusable/error/ErrorMessage";
import { ProductTypeDetails } from "../details/types/detailsTypes";

function DetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductTypeDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const fetchedProduct = await fetchPlantById(id);
          setProduct(fetchedProduct);
        } catch (error) {
          setError("Failed to fetch product details");
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage className="error" message={error} />;
  }

  if (!product) {
    return (
      <ErrorMessage
        className="error"
        message="No product found with the provided ID."
      />
    );
  }

  return (
    <ProductProvider product={product}>
      <Details />
    </ProductProvider>
  );
}

export default DetailsPage;
