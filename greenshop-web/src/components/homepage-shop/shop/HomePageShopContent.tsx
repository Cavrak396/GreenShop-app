import HomePageShopBar from "./HomePageShopBar";
import HomePageShopArticles from "./HomePageShopArticles";
import fakeData, { FakeDataTypes } from "./fakedata";
import { useMemo, useState } from "react";

function HomePageShopContent() {
  const [sortedData, setSortedData] = useState<FakeDataTypes[]>(fakeData);

  const memoizedSortedData = useMemo(() => {
    return sortedData;
  }, [sortedData]);

  return (
    <div className="homepageshop__content">
      <HomePageShopBar setSortedData={setSortedData} />
      <HomePageShopArticles sortedData={memoizedSortedData} />
    </div>
  );
}

export default HomePageShopContent;
