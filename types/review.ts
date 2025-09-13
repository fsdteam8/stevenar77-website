interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Facility {
  _id: string;
  name: string;
  address?: string;
}

export interface Review {
  _id: string;
  userId: User | null;       // user may be null
  facility?: Facility | null; // facility is optional
  productId: string;          // included in API response
  star: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
