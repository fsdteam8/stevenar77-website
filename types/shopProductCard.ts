export type ShopProductCard = {
  image: string;
  title: string;
  description: string;
  // rating: number;
  // reviews: number;
  price: string | number;
  onSeeMore?: () => void;
  onBookNow?: () => void;
  id: string;
};
