import type { Product } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Pahadi Bhatt Dal",
    description:
      "Authentic Himalayan black soybean (Bhatt) dal. Rich in protein, traditionally grown in the Kumaon hills of Uttarakhand. Known for its earthy flavor and nutritional benefits. Perfect for dal preparations and curries.",
    price: 299,
    originalPrice: 399,
    unit: "500g",
    image: "/assets/generated/pahadi-bhatt-dal.dim_600x600.jpg",
    category: "Lentils & Pulses",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Pahadi Gahat",
    description:
      "Traditional Himalayan horse gram (Gahat/Kulath) lentils from the Uttarakhand hills. Used in the famous 'Gahat ki Dal' and 'Ras' recipe. Rich in iron and dietary fiber. A staple in Pahadi cuisine.",
    price: 249,
    originalPrice: 329,
    unit: "500g",
    image: "/assets/generated/pahadi-gahat.dim_600x600.jpg",
    category: "Lentils & Pulses",
    rating: 4.7,
    reviews: 98,
    inStock: true,
    badge: "Organic",
  },
];
