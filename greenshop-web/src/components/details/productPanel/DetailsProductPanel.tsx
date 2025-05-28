import React, { useMemo, useEffect } from "react";
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
  const { user, token } = useUser();
  const { avgRating } = useRatings(ratingNumbers || {});

  useEffect(() => {
    if (id) {
      fetchComments(id, currentCommentsPage, currentPageSize);

      if (user) {
        fetchUserComment(id);
      }
    }
  }, [id, currentCommentsPage, currentPageSize, user]);

  const calculatedSalePrice = useMemo(() => {
    const basePrice = product.price;

    if (token && product.sale_Percent_Private > 0) {
      return basePrice * (1 - product.sale_Percent_Private / 100);
    } else if (product.sale_Percent > 0) {
      return basePrice * (1 - product.sale_Percent / 100);
    }

    return basePrice;
  }, [product, token]);

  return (
    <div className="details__product-panel">
      <div className="details__product-panel-container">
        <Title className="details__product-title middle-title">
          {product.name}
        </Title>
        <div className="details__product-line details__product-line--with-price-rating">
          <span className="details__product-price">
            ${calculatedSalePrice.toFixed(2)}
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
          <DetailsProductDescription
            className="details__product-description-text"
            text={product.short_Description.slice(0, 215) + "..."}
          />
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
