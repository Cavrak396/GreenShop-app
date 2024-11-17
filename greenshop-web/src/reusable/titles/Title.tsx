import "../reusable.css";
import { TitleTypes } from "../types/title";

function Title({ children, className }: TitleTypes) {
  return <h3 className={className}>{children}</h3>;
}

export default Title;
