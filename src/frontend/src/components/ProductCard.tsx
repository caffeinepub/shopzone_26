import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Page, Product } from "../types";

interface ProductCardProps {
  product: Product;
  inCart: boolean;
  inWishlist: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onNavigate: (page: Page, productId?: string) => void;
  index: number;
}

export default function ProductCard({
  product,
  inCart,
  inWishlist,
  onAddToCart,
  onToggleWishlist,
  onNavigate,
  index,
}: ProductCardProps) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  return (
    <div
      data-ocid={`products.item.${index}`}
      className="bg-card rounded-lg shadow-card overflow-hidden group flex flex-col"
    >
      {/* Image area */}
      <div className="relative overflow-hidden">
        <button
          type="button"
          className="w-full block focus:outline-none"
          onClick={() => onNavigate("product", product.id)}
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </button>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded pointer-events-none">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded pointer-events-none">
            -{discount}%
          </span>
        )}
        <button
          type="button"
          data-ocid={`products.toggle.${index}`}
          onClick={() => onToggleWishlist(product)}
          className={`absolute bottom-3 right-3 p-2 rounded-full shadow-md transition ${
            inWishlist
              ? "bg-red-50 text-red-500"
              : "bg-white/90 text-foreground hover:text-red-500"
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-red-500" : ""}`} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <button
          type="button"
          className="font-bold text-foreground text-base mb-1 text-left hover:text-primary transition"
          onClick={() => onNavigate("product", product.id)}
        >
          {product.name}
        </button>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold">{product.rating}</span>
          <span className="text-xs text-muted-foreground">
            ({product.reviews} reviews)
          </span>
        </div>

        <div className="flex items-end justify-between mt-auto">
          <div>
            <span className="text-lg font-black text-foreground">
              ₹{product.price}
            </span>
            <span className="text-xs text-muted-foreground line-through ml-1">
              ₹{product.originalPrice}
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              / {product.unit}
            </span>
          </div>
        </div>

        <button
          type="button"
          data-ocid={`products.${inCart ? "delete" : "primary"}_button.${index}`}
          onClick={() => onAddToCart(product)}
          className={`mt-3 w-full py-2.5 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition ${
            inCart
              ? "bg-secondary text-foreground border border-border hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              : "bg-primary text-white hover:opacity-90"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          {inCart ? "Added — Go to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
