export interface Product {
  id: string; // Unique identifier
  name: string; // Name of the product
  description: string; // Description of the product
  price: number; // Price of the product
  discountPrice: number;
  stock: number; // Number of items in stock
  category: string; // Category of the product (e.g., fruits, vegetables, grains)
  image: string; // URL of the product image
  farmerId: string; // ID of the farmer selling the product
  rating: number; // Rating of the product (0-5)
  createdAt: Date; // Date the product was added
}
