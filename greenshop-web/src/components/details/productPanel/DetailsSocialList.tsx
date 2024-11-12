import { detailsSocialMedia } from "../utils/detailsUtils";
import DetailsSocialItem from "./DetailsSocialItem";

function DetailsSocialList() {
  return (
    <div className="details__social-line">
      <span className="details__social-tag">Share this product: </span>
      <ul className="details__social-list">
        {detailsSocialMedia.map((item) => {
          return <DetailsSocialItem key={item.id} item={item} />;
        })}
      </ul>
    </div>
  );
}

export default DetailsSocialList;
