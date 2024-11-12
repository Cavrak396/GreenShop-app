import React from "react";
import { SocialMediaType } from "../types/detailsTypes";

function DetailsSocialItem({ item }: { item: SocialMediaType }) {
  return (
    <li className="details__social-item">
      <img src={item?.src} alt={item?.alt} className="details__social-image" />
    </li>
  );
}

export default React.memo(DetailsSocialItem);
