export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  unit: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: string;
  shipping: ShippingInfo;
}

export interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

export type Page =
  | "home"
  | "product"
  | "cart"
  | "checkout"
  | "profile"
  | "wishlist"
  | "admin"
  | "login"
  | "shop"
  | "about"
  | "contact";
