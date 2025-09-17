// types/trip.ts
export interface TripImage {
  public_id: string;
  url: string;
  _id: string;
}

export interface Trip {
  _id: string;
  title: string;
  description: string;
  price: number;
  maximumCapacity: number;
  location: string;
  startDate: string;
  endDate: string;
  images: TripImage[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
