import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Heart,
  Leaf,
  Shield,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import type { Page, Product } from "../types";

interface ProductDetailProps {
  product: Product;
  inCart: boolean;
  inWishlist: boolean;
  onAddToCart: (product: Product, qty: number) => void;
  onToggleWishlist: (product: Product) => void;
  onNavigate: (page: Page) => void;
}

export default function ProductDetail({
  product,
  inCart,
  inWishlist,
  onAddToCart,
  onToggleWishlist,
  onNavigate,
}: ProductDetailProps) {
  const [qty, setQty] = useState(1);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  const starKeys = ["s1", "s2", "s3", "s4", "s5"];

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <button
        type="button"
        data-ocid="product.link"
        onClick={() => onNavigate("home")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl object-cover shadow-card"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            {product.category}
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {starKeys.map((k, i) => (
                <Star
                  key={k}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-black text-foreground">
              ₹{product.price}
            </span>
            <span className="text-lg text-muted-foreground line-through">
              ₹{product.originalPrice}
            </span>
            <span className="text-sm bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded">
              Save {discount}%
            </span>
            <span className="text-sm text-muted-foreground">
              / {product.unit}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-semibold">Quantity</span>
            <div className="flex items-center border border-border rounded-md overflow-hidden">
              <button
                type="button"
                data-ocid="product.secondary_button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-secondary transition font-bold"
              >
                −
              </button>
              <span className="px-4 py-2 text-sm font-semibold min-w-[40px] text-center">
                {qty}
              </span>
              <button
                type="button"
                data-ocid="product.primary_button"
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 hover:bg-secondary transition font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            <button
              type="button"
              data-ocid="product.submit_button"
              onClick={() => onAddToCart(product, qty)}
              className="flex-1 py-3 bg-primary text-white font-bold rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              {inCart ? "Update Cart" : "Add to Cart"}
            </button>
            <button
              type="button"
              data-ocid="product.toggle"
              onClick={() => onToggleWishlist(product)}
              className={`p-3 border border-border rounded-md transition ${
                inWishlist
                  ? "bg-red-50 text-red-500 border-red-200"
                  : "hover:bg-secondary"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${inWishlist ? "fill-red-500" : ""}`}
              />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(
              [
                { icon: Leaf, label: "100% Organic" },
                { icon: Truck, label: "Fast Delivery" },
                { icon: Shield, label: "Authentic" },
              ] as const
            ).map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 p-3 bg-secondary rounded-lg text-center"
              >
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-xs font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description" data-ocid="product.tab">
              Description
            </TabsTrigger>
            <TabsTrigger value="nutrition" data-ocid="product.tab">
              Nutrition
            </TabsTrigger>
            <TabsTrigger value="cooking" data-ocid="product.tab">
              How to Cook
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="description"
            className="mt-4 text-sm text-muted-foreground leading-relaxed"
          >
            {product.description}
          </TabsContent>
          <TabsContent
            value="nutrition"
            className="mt-4 text-sm text-muted-foreground leading-relaxed"
          >
            Rich in protein, dietary fiber, iron, and essential minerals.
            Traditionally grown without chemical pesticides in the clean
            mountain air of Uttarakhand. Each 100g serving provides
            approximately 25g protein and 12g dietary fiber.
          </TabsContent>
          <TabsContent
            value="cooking"
            className="mt-4 text-sm text-muted-foreground leading-relaxed space-y-2"
          >
            <p>1. Wash and soak overnight (8–10 hours) for best results.</p>
            <p>2. Pressure cook with 3x water for 4–5 whistles.</p>
            <p>
              3. Prepare a tadka with ghee, cumin, garlic, onion, and tomatoes.
            </p>
            <p>4. Add cooked dal, salt, and spices. Simmer for 10 minutes.</p>
            <p>
              5. Garnish with fresh coriander and serve with rice or chapati.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
