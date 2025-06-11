import React, { useEffect } from "react";
import DetailsProductDescription from "../DetailsProductDescription";
import ProductSizesList from "./DetailsProductSizesList";
import DetailsQuantity from "./DetailsQuantity";
import DetailsOrderButtons from "./DetailsOrderButtons";
import DetailsSocialList from "./DetailsSocialList";
import Title from "../../../reusable/titles/Title";
import StaticStars from "../../../reusable/stars/StaticStars";
import { useProduct } from "../../../context/ProductContext";
import { useRatings } from "../../../customHooks/useRating";
import { useComments } from "../../../context/ReviewsContext";
import { useParams } from "react-router-dom";
import { useUser } from "../../../context/AuthContext";
import { usePrice } from "../../../customHooks/usePriceCalculator";

function DetailsProductPanel() {
  const product = useProduct();
  const {
    ratingNumbers,
    fetchComments,
    fetchUserComment,
    currentCommentsPage,
    currentPageSize,
  } = useComments();
  const { id } = useParams();
  const { user } = useUser();
  const { avgRating } = useRatings(ratingNumbers || {});

  const { getPrice } = usePrice();

  useEffect(() => {
    if (id) {
      fetchComments(id, currentCommentsPage, currentPageSize);

      if (user) {
        fetchUserComment(id);
      }
    }
  }, [id, currentCommentsPage, currentPageSize, user]);

  const displayedPrice = React.useMemo(() => {
    if (!product) return 0;
    return getPrice(product);
  }, [product, getPrice]);

  return (
    <div className="details__product-panel">
      <div className="details__product-panel-container">
        <Title className="details__product-title middle-title">
          {product?.name}
        </Title>
        <div className="details__product-line details__product-line--with-price-rating">
          <span className="details__product-price">
            ${displayedPrice.toFixed(2)}
          </span>
          <StaticStars
            rate={avgRating}
            starClassName="details__product-star"
            starPositionClassName="details__stars-line"
          />
        </div>
        <div className="details__product-description">
          <span className="details__product-description-tag">
            Short Description:
          </span>
          <DetailsProductDescription shortDescription={true} />
        </div>
        <ProductSizesList />
        <div className="details__product-line">
          <DetailsQuantity />
          <DetailsOrderButtons />
        </div>
        <DetailsSocialList />
      </div>
    </div>
  );
}

export default React.memo(DetailsProductPanel);
