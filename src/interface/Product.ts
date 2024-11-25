export interface Product {
  _id: string; // MongoDB ObjectId as a string
  farmerId: string; // MongoDB ObjectId of the farmer
  name: string;
  description: string;
  category: string;
  price: number;
  isAvailable: boolean;
  stock: number;
  images: string[]; // Array of image URLs or paths
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string (from `timestamps` option)
}
