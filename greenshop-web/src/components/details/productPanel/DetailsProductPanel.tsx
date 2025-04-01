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

function DetailsProductPanel() {
  const product = useProduct();
  const { comments, fetchComments, fetchUserComment } = useComments();
  const { id } = useParams();
  const { currentPage, currentPageSize } = useComments();
  const { avgRating } = useRatings(comments);

  useEffect(() => {
    if (id) {
      fetchComments(id, currentPage, currentPageSize);
      fetchUserComment(id);
    }
  }, [id, currentPage, currentPageSize]);

  const calculatedSalePrice = useMemo(() => {
    return product.sale_Percent
      ? product.price * (1 - product.sale_Percent / 100)
      : product.price;
  }, [product]);

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
