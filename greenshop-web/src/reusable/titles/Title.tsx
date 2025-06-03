import { TitleTypes } from "../types/title";
import "./titles.css";

function Title({ children, className }: TitleTypes) {
  return <h2 className={className}>{children}</h2>;
}

export default Title;
