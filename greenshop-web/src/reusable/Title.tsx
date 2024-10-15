import "./reusable.css";

interface SmallTitleTypes {
  children: string;
  className: string;
}

function SmallTitle({ children, className }: SmallTitleTypes) {
  return <h3 className={className}>{children}</h3>;
}

export default SmallTitle;
