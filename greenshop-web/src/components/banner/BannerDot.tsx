import { BannerDotProps } from "./types/bannerTypes";

function BannerDot({ id, isActive, onClick }: BannerDotProps) {
  return (
    <span
      className={`banner__dot ${isActive ? "active-dot" : ""}`}
      onClick={() => onClick(id)}
    ></span>
  );
}

export default BannerDot;
