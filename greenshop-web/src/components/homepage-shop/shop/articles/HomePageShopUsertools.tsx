import { HomePageShopUserToolsProps } from "../shopTypes";

function HomePageShopUserTools({
  userTools,
  addItemToCart,
  item,
}: HomePageShopUserToolsProps) {
  return (
    <div className="homepageshop__article-usertools">
      {userTools.map((tool) => (
        <img
          key={tool.id}
          src={tool.src}
          alt={tool.alt}
          className={tool.className}
          onClick={
            tool.alt === "user cart" ? () => addItemToCart(item) : undefined
          }
        />
      ))}
    </div>
  );
}

export default HomePageShopUserTools;