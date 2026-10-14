export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  image: string;
  category: string;
  tags: string;
  sizes: string;
  color: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  inStock: boolean;
}

export interface CartItem {
  key: string; // productId + size
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}
