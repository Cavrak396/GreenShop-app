import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import fakeData, { FakeDataTypes } from "../homepage-shop/shop/fakedata";

function Details() {
  const { label } = useParams();
  const [item, setItem] = useState<FakeDataTypes | null>(null);

  useEffect(() => {
    if (label) {
      const fetchedItem = fakeData.find((item) => item.label === label);
      setItem(fetchedItem || null);
    }
  }, [label]);

  if (!item) {
    return <p>Loading...</p>;
  }

  return <div className="details"></div>;
}

export default Details;