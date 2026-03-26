import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Save, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Order, Page, UserProfile } from "../types";

interface ProfilePageProps {
  profile: UserProfile;
  orders: Order[];
  onSaveProfile: (data: UserProfile) => void;
  onNavigate: (page: Page) => void;
}

export default function ProfilePage({
  profile,
  orders,
  onSaveProfile,
  onNavigate,
}: ProfilePageProps) {
  const [form, setForm] = useState<UserProfile>(profile);
  const [tab, setTab] = useState<"profile" | "orders">("profile");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(form);
    toast.success("Profile saved!");
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <h1 className="text-2xl font-black uppercase tracking-tight mb-6">
        My Account
      </h1>

      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        <button
          type="button"
          data-ocid="profile.tab"
          onClick={() => setTab("profile")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition ${
            tab === "profile"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="w-4 h-4" /> Profile
        </button>
        <button
          type="button"
          data-ocid="profile.tab"
          onClick={() => setTab("orders")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition ${
            tab === "orders"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Package className="w-4 h-4" /> Orders ({orders.length})
        </button>
      </div>

      {tab === "profile" && (
        <form
          onSubmit={handleSave}
          className="bg-card rounded-lg p-6 shadow-xs"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="p-name"
                className="text-xs font-semibold uppercase tracking-wider"
              >
                Full Name
              </Label>
              <Input
                data-ocid="profile.input"
                id="p-name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="mt-1"
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label
                htmlFor="p-email"
                className="text-xs font-semibold uppercase tracking-wider"
              >
                Email
              </Label>
              <Input
                data-ocid="profile.input"
                id="p-email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="mt-1"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label
                htmlFor="p-phone"
                className="text-xs font-semibold uppercase tracking-wider"
              >
                Phone
              </Label>
              <Input
                data-ocid="profile.input"
                id="p-phone"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="mt-1"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div>
              <Label
                htmlFor="p-city"
                className="text-xs font-semibold uppercase tracking-wider"
              >
                City
              </Label>
              <Input
                data-ocid="profile.input"
                id="p-city"
                value={form.city}
                onChange={(e) =>
                  setForm((f) => ({ ...f, city: e.target.value }))
                }
                className="mt-1"
                placeholder="City"
              />
            </div>
            <div className="sm:col-span-2">
              <Label
                htmlFor="p-address"
                className="text-xs font-semibold uppercase tracking-wider"
              >
                Address
              </Label>
              <Input
                data-ocid="profile.input"
                id="p-address"
                value={form.address}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
                className="mt-1"
                placeholder="Street address"
              />
            </div>
            <div>
              <Label
                htmlFor="p-pin"
                className="text-xs font-semibold uppercase tracking-wider"
              >
                Pincode
              </Label>
              <Input
                data-ocid="profile.input"
                id="p-pin"
                value={form.pincode}
                onChange={(e) =>
                  setForm((f) => ({ ...f, pincode: e.target.value }))
                }
                className="mt-1"
                placeholder="PIN Code"
              />
            </div>
          </div>
          <button
            data-ocid="profile.save_button"
            type="submit"
            className="mt-6 flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-md hover:opacity-90 transition"
          >
            <Save className="w-4 h-4" /> Save Profile
          </button>
        </form>
      )}

      {tab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div data-ocid="profile.empty_state" className="text-center py-16">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground font-semibold">
                No orders yet
              </p>
              <button
                type="button"
                data-ocid="profile.primary_button"
                onClick={() => onNavigate("home")}
                className="mt-4 px-5 py-2.5 bg-primary text-white font-bold rounded-md hover:opacity-90 transition text-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map((order, idx) => (
              <div
                key={order.id}
                data-ocid={`profile.item.${idx + 1}`}
                className="bg-card rounded-lg p-5 shadow-xs"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.date}
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded">
                    {order.status}
                  </span>
                </div>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 text-sm"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <span className="flex-1 font-medium">
                        {item.product.name}
                      </span>
                      <span className="text-muted-foreground">
                        x{item.quantity}
                      </span>
                      <span className="font-semibold">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-border flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Deliver to: {order.shipping.city}
                  </span>
                  <span className="font-black">₹{order.total}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}
