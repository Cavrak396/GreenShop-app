import { HomePageShopUserToolsProps } from "../../types/shopTypes";
import { toast } from "react-toastify";

function HomePageShopUserTools({
  userTools,
  addItemToCart,
  item,
}: HomePageShopUserToolsProps) {
  const handleClick = (alt: string) => {
    if (alt === "user cart") {
      addItemToCart(item);
    } else if (alt === "user heart") {
      toast.info(
        "Sorry, but my developers decided I don`t need to do anything 😄"
      );
    }
  };

  return (
    <div className="homepageshop__article-usertools">
      {userTools.map((tool) => (
        <img
          key={tool.id}
          src={tool.src}
          alt={tool.alt}
          className={tool.className}
          onClick={() => handleClick(tool.alt)}
        />
      ))}
    </div>
  );
}

export default HomePageShopUserTools;
