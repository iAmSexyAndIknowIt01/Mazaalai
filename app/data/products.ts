// data/products.ts
export type ProductVariant = {
  id: string;
  name: string;
  price: number;
  description: string;
  colors: { name: string; image: string }[];
};

export const products: ProductVariant[] = [
  {
    id: 'alert-basic',
    name: 'Mazaalai Alert Basic',
    price: 59000,
    description: 'Авсаархан, дуу + гэрэлтэй',
    colors: [
      { name: 'Pink', image: '/products/alert-pink.jpg' },
      { name: 'Blue', image: '/products/alert-blue.jpg' },
    ],
  },
  {
    id: 'alert-pro',
    name: 'Mazaalai Alert Pro',
    price: 79000,
    description: 'Pro аюулгүй байдлын төхөөрөмж',
    colors: [
      { name: 'Pink', image: '/products/alert-pink.jpg' },
      { name: 'Blue', image: '/products/alert-blue.jpg' },
    ],
  },
];
