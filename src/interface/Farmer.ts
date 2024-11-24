import { Product } from "./Product";

export interface Farmer {
  id: string; // Unique identifier
  name: string; // Store/Farmer name
  image: string;
  location: string; // Address or general location
  phone: string; // Contact number
  email: string; // Contact email
  description: string; // Brief description about the farmer/store
  products: Product[]; // List of products sold by the farmer/store
  rating: number; // Overall rating (0-5)
  joinedDate: Date; // Date the farmer/store joined the platform
}
