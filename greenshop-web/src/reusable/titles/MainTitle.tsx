import { TitleTypes } from "../types/title";
import "./titles.css";

function MainTitle({ children, className }: TitleTypes) {
  return <h1 className={className}>{children}</h1>;
}

export default MainTitle;
