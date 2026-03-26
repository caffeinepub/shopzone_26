import { Heart } from "lucide-react";
import type { Page, Product } from "../types";
import ProductCard from "./ProductCard";

interface WishlistPageProps {
  wishlist: Product[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInCart: (id: string) => boolean;
  onNavigate: (page: Page, productId?: string) => void;
}

export default function WishlistPage({
  wishlist,
  onAddToCart,
  onToggleWishlist,
  isInCart,
  onNavigate,
}: WishlistPageProps) {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <h1 className="text-2xl font-black uppercase tracking-tight mb-6">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div
          data-ocid="wishlist.empty_state"
          className="flex flex-col items-center py-20 gap-4"
        >
          <Heart className="w-16 h-16 text-muted-foreground" />
          <p className="text-lg font-semibold text-muted-foreground">
            Your wishlist is empty
          </p>
          <button
            type="button"
            data-ocid="wishlist.primary_button"
            onClick={() => onNavigate("home")}
            className="px-6 py-3 bg-primary text-white font-bold rounded-md hover:opacity-90 transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              inCart={isInCart(product.id)}
              inWishlist={true}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onNavigate={onNavigate}
              index={idx + 1}
            />
          ))}
        </div>
      )}
    </main>
  );
}
