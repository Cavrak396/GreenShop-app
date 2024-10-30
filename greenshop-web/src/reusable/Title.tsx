import "./reusable.css";

interface TitleTypes {
  children: string;
  className: string;
}

function Title({ children, className }: TitleTypes) {
  return <h3 className={className}>{children}</h3>;
}

export default Title;
