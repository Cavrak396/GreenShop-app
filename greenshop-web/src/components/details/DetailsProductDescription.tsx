import React from "react";
import { ProductDescriptionType } from "./types/detailsTypes";

function DetailsProductDescription({
  className,
  text,
}: ProductDescriptionType) {
  return <p className={className}>{text}</p>;
}

export default React.memo(DetailsProductDescription);
