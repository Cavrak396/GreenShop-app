import flowerpotThird from "../../../assets/images/banner/banner-image-third.png";

export interface FakeDataTypes {
  id: number;
  price: number;
  label: string;
  src: string;
  sale: number | undefined;
}

const fakeData: FakeDataTypes[] = [
  {
    id: 1,
    price: 169,
    label: "Barberton Daisy",
    src: flowerpotThird,
    sale: 13,
  },
  {
    id: 2,
    price: 199.0,
    label: "Peace Lily",
    src: flowerpotThird,
    sale: undefined,
  },
  { id: 3, price: 249.0, label: "Snake Plant", src: flowerpotThird, sale: 45 },
  { id: 4, price: 139.0, label: "Spider Plant", src: flowerpotThird, sale: 70 },
  {
    id: 5,
    price: 159.0,
    label: "Aloe Vera",
    src: flowerpotThird,
    sale: undefined,
  },
  { id: 6, price: 199.0, label: "Rubber Plant", src: flowerpotThird, sale: 88 },
  { id: 7, price: 89.0, label: "Cactus", src: flowerpotThird, sale: undefined },
  { id: 8, price: 120.0, label: "Pothos", src: flowerpotThird, sale: 55 },
  { id: 9, price: 110.0, label: "Bamboo Plant", src: flowerpotThird, sale: 20 },
];

export default fakeData;
