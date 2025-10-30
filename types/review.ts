interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: {
    url: string;
  };
}

interface Facility {
  _id: string;
  name: string;
  address?: string;
}

export interface Review {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: {
      url: string;
    };
  };
  facility?: Facility | null; // facility is optional
  productId?: string; // optional now
  star: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
