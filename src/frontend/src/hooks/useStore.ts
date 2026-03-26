import { useEffect, useState } from "react";
import { PRODUCTS } from "../data/products";
import type { CartItem, Order, Product, User, UserProfile } from "../types";

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function useStore() {
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadFromStorage<CartItem[]>("shopzone_cart", []),
  );
  const [wishlist, setWishlist] = useState<Product[]>(() =>
    loadFromStorage<Product[]>("shopzone_wishlist", []),
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    loadFromStorage<Order[]>("shopzone_orders", []),
  );
  const [profile, setProfile] = useState<UserProfile>(() =>
    loadFromStorage<UserProfile>("shopzone_profile", {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
    }),
  );
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = loadFromStorage<Product[]>("shopzone_products", []);
    return stored.length > 0 ? stored : PRODUCTS;
  });
  const [users, setUsers] = useState<User[]>(() =>
    loadFromStorage<User[]>("shopzone_users", []),
  );
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
  } | null>(() =>
    loadFromStorage<{ name: string; email: string } | null>(
      "shopzone_current_user",
      null,
    ),
  );

  useEffect(() => {
    saveToStorage("shopzone_cart", cart);
  }, [cart]);
  useEffect(() => {
    saveToStorage("shopzone_wishlist", wishlist);
  }, [wishlist]);
  useEffect(() => {
    saveToStorage("shopzone_orders", orders);
  }, [orders]);
  useEffect(() => {
    saveToStorage("shopzone_profile", profile);
  }, [profile]);
  useEffect(() => {
    saveToStorage("shopzone_products", products);
  }, [products]);
  useEffect(() => {
    saveToStorage("shopzone_users", users);
  }, [users]);
  useEffect(() => {
    saveToStorage("shopzone_current_user", currentUser);
  }, [currentUser]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateCartQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      return exists
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product];
    });
  };

  const isInWishlist = (productId: string) =>
    wishlist.some((p) => p.id === productId);

  const isInCart = (productId: string) =>
    cart.some((i) => i.product.id === productId);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = (shipping: import("../types").ShippingInfo) => {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      items: [...cart],
      total: cartTotal,
      status: "Confirmed",
      shipping,
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
    return order;
  };

  const saveProfile = (data: UserProfile) => setProfile(data);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const registerUser = (
    name: string,
    email: string,
    password: string,
  ): "ok" | "email_taken" => {
    const existing = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (existing) return "email_taken";
    const newUser: User = { name, email, password };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser({ name, email });
    return "ok";
  };

  const loginUser = (email: string, password: string): "ok" | "invalid" => {
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );
    if (!user) return "invalid";
    setCurrentUser({ name: user.name, email: user.email });
    return "ok";
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const resetPassword = (
    email: string,
    newPassword: string,
  ): "ok" | "not_found" => {
    const idx = users.findIndex(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (idx === -1) return "not_found";
    setUsers((prev) =>
      prev.map((u, i) => (i === idx ? { ...u, password: newPassword } : u)),
    );
    return "ok";
  };

  return {
    cart,
    wishlist,
    orders,
    profile,
    products,
    users,
    currentUser,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    toggleWishlist,
    isInWishlist,
    isInCart,
    cartTotal,
    cartCount,
    placeOrder,
    saveProfile,
    addProduct,
    updateProduct,
    deleteProduct,
    registerUser,
    loginUser,
    logoutUser,
    resetPassword,
  };
}
