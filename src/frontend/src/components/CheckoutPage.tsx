import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";
import type { CartItem, Order, Page, ShippingInfo } from "../types";

interface CheckoutPageProps {
  cart: CartItem[];
  cartTotal: number;
  onPlaceOrder: (shipping: ShippingInfo) => Order;
  onNavigate: (page: Page) => void;
  profileName: string;
  profileEmail: string;
}

export default function CheckoutPage({
  cart,
  cartTotal,
  onPlaceOrder,
  onNavigate,
  profileName,
  profileEmail,
}: CheckoutPageProps) {
  const [form, setForm] = useState<ShippingInfo>({
    name: profileName,
    email: profileEmail,
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});
  const [placed, setPlaced] = useState<Order | null>(null);

  const shipping = cartTotal >= 499 ? 0 : 49;
  const grandTotal = cartTotal + shipping;

  const validate = () => {
    const e: Partial<ShippingInfo> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.pincode.trim()) e.pincode = "Pincode is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const order = onPlaceOrder(form);
    setPlaced(order);
  };

  if (placed) {
    return (
      <main className="max-w-lg mx-auto px-4 py-16 text-center animate-fade-in">
        <div data-ocid="checkout.success_state">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black mb-2">Order Placed! 🎉</h1>
          <p className="text-muted-foreground mb-2">
            Order ID: <strong>{placed.id}</strong>
          </p>
          <p className="text-muted-foreground mb-8">
            We will deliver to {placed.shipping.city} soon.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              data-ocid="checkout.primary_button"
              onClick={() => onNavigate("home")}
              className="px-6 py-3 bg-primary text-white font-bold rounded-md hover:opacity-90 transition"
            >
              Continue Shopping
            </button>
            <button
              type="button"
              data-ocid="checkout.secondary_button"
              onClick={() => onNavigate("profile")}
              className="px-6 py-3 border border-border font-bold rounded-md hover:bg-secondary transition"
            >
              View Orders
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <button
        type="button"
        data-ocid="checkout.link"
        onClick={() => onNavigate("cart")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </button>

      <h1 className="text-2xl font-black uppercase tracking-tight mb-6">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg p-6 shadow-xs">
              <h2 className="font-bold text-lg mb-5">Shipping Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="co-name"
                    className="text-xs font-semibold uppercase tracking-wider"
                  >
                    Full Name
                  </Label>
                  <Input
                    data-ocid="checkout.input"
                    id="co-name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="mt-1"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p
                      data-ocid="checkout.error_state"
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="co-email"
                    className="text-xs font-semibold uppercase tracking-wider"
                  >
                    Email
                  </Label>
                  <Input
                    data-ocid="checkout.input"
                    id="co-email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="mt-1"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p
                      data-ocid="checkout.error_state"
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="co-phone"
                    className="text-xs font-semibold uppercase tracking-wider"
                  >
                    Phone
                  </Label>
                  <Input
                    data-ocid="checkout.input"
                    id="co-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    className="mt-1"
                    placeholder="+91 XXXXX XXXXX"
                  />
                  {errors.phone && (
                    <p
                      data-ocid="checkout.error_state"
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="co-city"
                    className="text-xs font-semibold uppercase tracking-wider"
                  >
                    City
                  </Label>
                  <Input
                    data-ocid="checkout.input"
                    id="co-city"
                    value={form.city}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, city: e.target.value }))
                    }
                    className="mt-1"
                    placeholder="City"
                  />
                  {errors.city && (
                    <p
                      data-ocid="checkout.error_state"
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.city}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <Label
                    htmlFor="co-address"
                    className="text-xs font-semibold uppercase tracking-wider"
                  >
                    Address
                  </Label>
                  <Input
                    data-ocid="checkout.input"
                    id="co-address"
                    value={form.address}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, address: e.target.value }))
                    }
                    className="mt-1"
                    placeholder="Street address, apartment, etc."
                  />
                  {errors.address && (
                    <p
                      data-ocid="checkout.error_state"
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.address}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="co-pincode"
                    className="text-xs font-semibold uppercase tracking-wider"
                  >
                    Pincode
                  </Label>
                  <Input
                    data-ocid="checkout.input"
                    id="co-pincode"
                    value={form.pincode}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, pincode: e.target.value }))
                    }
                    className="mt-1"
                    placeholder="PIN Code"
                  />
                  {errors.pincode && (
                    <p
                      data-ocid="checkout.error_state"
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-xs h-fit">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-3 text-sm">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">
                      {item.product.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      x{item.quantity}
                    </p>
                  </div>
                  <p className="font-bold flex-shrink-0">
                    ₹{item.product.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
            <hr className="border-border mb-3" />
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span
                  className={
                    shipping === 0 ? "text-green-600 font-semibold" : ""
                  }
                >
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between font-black text-base">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
            <button
              data-ocid="checkout.submit_button"
              type="submit"
              className="w-full py-3 bg-primary text-white font-bold rounded-md hover:opacity-90 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
