import { BarItemsTypes } from "../shopTypes";

function HomePageShopBarItem({ item }: { item: BarItemsTypes }) {
  return <li className="homepageshop__bar-item">{item.label}</li>;
}

export default HomePageShopBarItem;
