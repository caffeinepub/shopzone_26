import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import type { CartItem, Page } from "../types";

interface CartPageProps {
  cart: CartItem[];
  cartTotal: number;
  onUpdateQty: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
  onNavigate: (page: Page) => void;
}

export default function CartPage({
  cart,
  cartTotal,
  onUpdateQty,
  onRemove,
  onNavigate,
}: CartPageProps) {
  const shipping = cartTotal >= 499 ? 0 : 49;
  const grandTotal = cartTotal + shipping;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <button
        type="button"
        data-ocid="cart.link"
        onClick={() => onNavigate("home")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Continue Shopping
      </button>

      <h1 className="text-2xl font-black uppercase tracking-tight mb-6">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div
          data-ocid="cart.empty_state"
          className="flex flex-col items-center py-20 gap-4"
        >
          <ShoppingBag className="w-16 h-16 text-muted-foreground" />
          <p className="text-lg font-semibold text-muted-foreground">
            Your cart is empty
          </p>
          <button
            type="button"
            data-ocid="cart.primary_button"
            onClick={() => onNavigate("home")}
            className="px-6 py-3 bg-primary text-white font-bold rounded-md hover:opacity-90 transition"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <div
                key={item.product.id}
                data-ocid={`cart.item.${idx + 1}`}
                className="bg-card rounded-lg p-4 flex gap-4 shadow-xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm">{item.product.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {item.product.unit}
                  </p>
                  <p className="font-black text-base mt-1">
                    ₹{item.product.price}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-border rounded-md overflow-hidden">
                      <button
                        type="button"
                        data-ocid={`cart.secondary_button.${idx + 1}`}
                        onClick={() =>
                          onUpdateQty(item.product.id, item.quantity - 1)
                        }
                        className="px-2 py-1 hover:bg-secondary transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        data-ocid={`cart.primary_button.${idx + 1}`}
                        onClick={() =>
                          onUpdateQty(item.product.id, item.quantity + 1)
                        }
                        className="px-2 py-1 hover:bg-secondary transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      data-ocid={`cart.delete_button.${idx + 1}`}
                      onClick={() => onRemove(item.product.id)}
                      className="text-red-500 hover:text-red-700 transition p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="font-black text-right flex-shrink-0">
                  ₹{item.product.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-lg p-6 shadow-xs h-fit">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span
                  className={`font-semibold ${shipping === 0 ? "text-green-600" : ""}`}
                >
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">
                  Add ₹{499 - cartTotal} more for free shipping
                </p>
              )}
              <hr className="border-border my-2" />
              <div className="flex justify-between font-black text-base">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
            <button
              type="button"
              data-ocid="cart.submit_button"
              onClick={() => onNavigate("checkout")}
              className="w-full py-3 bg-primary text-white font-bold rounded-md hover:opacity-90 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
