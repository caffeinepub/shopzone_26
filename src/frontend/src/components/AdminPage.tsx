import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  ChevronUp,
  LogOut,
  Package,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Order, Page, Product } from "../types";

const ADMIN_PASSWORD = "admin123";
const AUTH_KEY = "shopzone_admin_auth";

interface AdminPageProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (p: Product) => void;
  onUpdateProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onNavigate: (page: Page) => void;
}

const emptyForm = (): Omit<Product, "id" | "rating" | "reviews"> => ({
  name: "",
  description: "",
  price: 0,
  originalPrice: 0,
  unit: "",
  image: "",
  category: "",
  badge: "",
  inStock: true,
});

export default function AdminPage({
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}: AdminPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(AUTH_KEY) === "true",
  );
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm());

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      setIsAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Try admin123.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setPassword("");
  };

  const openAddDialog = () => {
    setEditingProduct(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      unit: product.unit,
      image: product.image,
      category: product.category,
      badge: product.badge ?? "",
      inStock: product.inStock,
    });
    setDialogOpen(true);
  };

  const handleSaveProduct = () => {
    if (!form.name.trim() || !form.price) {
      toast.error("Name and price are required.");
      return;
    }
    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        ...form,
        badge: form.badge || undefined,
      });
      toast.success("Product updated.");
    } else {
      onAddProduct({
        id: `prod-${Date.now()}`,
        rating: 0,
        reviews: 0,
        ...form,
        badge: form.badge || undefined,
      });
      toast.success("Product added.");
    }
    setDialogOpen(false);
  };

  const handleDeleteConfirm = (id: string) => {
    onDeleteProduct(id);
    setDeleteConfirmId(null);
    toast.success("Product deleted.");
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <div
          data-ocid="admin.panel"
          className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-md p-8 flex flex-col gap-6"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-xl font-black tracking-tight">Admin Access</h1>
            <p className="text-sm text-muted-foreground text-center">
              Enter the admin password to continue.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              data-ocid="admin.input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            {passwordError && (
              <p
                data-ocid="admin.error_state"
                className="text-xs text-destructive"
              >
                {passwordError}
              </p>
            )}
          </div>

          <Button
            data-ocid="admin.submit_button"
            onClick={handleLogin}
            className="w-full"
          >
            Login to Admin
          </Button>
        </div>
      </main>
    );
  }

  // --- ADMIN PANEL ---
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage products and orders for ShopZone Pahadi Store.
          </p>
        </div>
        <Button
          data-ocid="admin.logout_button"
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="mb-6">
          <TabsTrigger data-ocid="admin.products.tab" value="products">
            Products ({products.length})
          </TabsTrigger>
          <TabsTrigger data-ocid="admin.orders.tab" value="orders">
            Orders ({orders.length})
          </TabsTrigger>
        </TabsList>

        {/* PRODUCTS TAB */}
        <TabsContent value="products">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">All Products</h2>
            <Button
              data-ocid="admin.product.open_modal_button"
              onClick={openAddDialog}
              size="sm"
              className="gap-2"
            >
              <Plus className="w-4 h-4" /> Add Product
            </Button>
          </div>

          <div className="rounded-xl border border-border overflow-hidden">
            <Table data-ocid="admin.product.table">
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Badge</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-10 text-muted-foreground"
                      data-ocid="admin.product.empty_state"
                    >
                      No products yet. Add your first product.
                    </TableCell>
                  </TableRow>
                )}
                {products.map((product, idx) => (
                  <TableRow
                    key={product.id}
                    data-ocid={`admin.product.item.${idx + 1}`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover bg-muted"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23f3f4f6'/%3E%3C/svg%3E";
                          }}
                        />
                        <span className="font-medium text-sm">
                          {product.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {product.category}
                    </TableCell>
                    <TableCell className="text-sm font-semibold">
                      ₹{product.price}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {product.unit}
                    </TableCell>
                    <TableCell>
                      {product.inStock ? (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          In Stock
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Out of Stock</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.badge ? (
                        <Badge variant="outline">{product.badge}</Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          data-ocid={`admin.product.edit_button.${idx + 1}`}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openEditDialog(product)}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          data-ocid={`admin.product.delete_button.${idx + 1}`}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => setDeleteConfirmId(product.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ORDERS TAB */}
        <TabsContent value="orders">
          <h2 className="font-bold text-lg mb-4">All Orders</h2>
          {orders.length === 0 ? (
            <div
              data-ocid="admin.orders.empty_state"
              className="text-center py-16 text-muted-foreground border border-border rounded-xl"
            >
              <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
              No orders have been placed yet.
            </div>
          ) : (
            <div className="rounded-xl border border-border overflow-hidden">
              <Table data-ocid="admin.orders.table">
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order, idx) => (
                    <>
                      <TableRow
                        key={order.id}
                        data-ocid={`admin.orders.item.${idx + 1}`}
                        className="cursor-pointer hover:bg-muted/30"
                        onClick={() =>
                          setExpandedOrderId(
                            expandedOrderId === order.id ? null : order.id,
                          )
                        }
                      >
                        <TableCell className="font-mono text-xs font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell className="text-sm">
                          {order.shipping.name}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {order.date}
                        </TableCell>
                        <TableCell className="text-sm">
                          {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""}
                        </TableCell>
                        <TableCell className="text-sm font-semibold">
                          ₹{order.total.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {expandedOrderId === order.id ? (
                            <ChevronUp className="w-4 h-4 ml-auto text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 ml-auto text-muted-foreground" />
                          )}
                        </TableCell>
                      </TableRow>

                      {expandedOrderId === order.id && (
                        <TableRow key={`${order.id}-detail`}>
                          <TableCell
                            colSpan={7}
                            className="bg-muted/20 px-6 py-4"
                          >
                            <div className="grid sm:grid-cols-2 gap-6">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                                  Shipping Address
                                </p>
                                <p className="text-sm">{order.shipping.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {order.shipping.address},{" "}
                                  {order.shipping.city} -{" "}
                                  {order.shipping.pincode}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {order.shipping.phone}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {order.shipping.email}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                                  Items
                                </p>
                                <ul className="flex flex-col gap-1">
                                  {order.items.map((item) => (
                                    <li
                                      key={item.product.id}
                                      className="text-sm flex justify-between"
                                    >
                                      <span>
                                        {item.product.name} × {item.quantity}
                                      </span>
                                      <span className="font-medium">
                                        ₹
                                        {(
                                          item.product.price * item.quantity
                                        ).toFixed(2)}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                                <div className="border-t border-border mt-2 pt-2 flex justify-between text-sm font-bold">
                                  <span>Total</span>
                                  <span>₹{order.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* ADD / EDIT PRODUCT DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          data-ocid="admin.product.dialog"
          className="max-w-lg max-h-[90vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <div className="grid gap-1.5">
              <Label htmlFor="p-name">Product Name *</Label>
              <Input
                id="p-name"
                data-ocid="admin.product.input"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. Pahadi Bhatt Dal"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="p-desc">Description</Label>
              <Textarea
                id="p-desc"
                data-ocid="admin.product.textarea"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Product description..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="p-price">Price (₹) *</Label>
                <Input
                  id="p-price"
                  type="number"
                  value={form.price || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: Number(e.target.value) }))
                  }
                  placeholder="299"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="p-orig">Original Price (₹)</Label>
                <Input
                  id="p-orig"
                  type="number"
                  value={form.originalPrice || ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      originalPrice: Number(e.target.value),
                    }))
                  }
                  placeholder="399"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="p-unit">Unit</Label>
                <Input
                  id="p-unit"
                  value={form.unit}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, unit: e.target.value }))
                  }
                  placeholder="500g"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="p-cat">Category</Label>
                <Input
                  id="p-cat"
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  placeholder="Lentils & Pulses"
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="p-image">Image URL</Label>
              <Input
                id="p-image"
                value={form.image}
                onChange={(e) =>
                  setForm((f) => ({ ...f, image: e.target.value }))
                }
                placeholder="/assets/generated/my-product.jpg"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="p-badge">Badge (optional)</Label>
              <Input
                id="p-badge"
                value={form.badge}
                onChange={(e) =>
                  setForm((f) => ({ ...f, badge: e.target.value }))
                }
                placeholder="Best Seller, New, Organic..."
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="p-stock"
                data-ocid="admin.product.switch"
                checked={form.inStock}
                onCheckedChange={(val) =>
                  setForm((f) => ({ ...f, inStock: val }))
                }
              />
              <Label htmlFor="p-stock">In Stock</Label>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              data-ocid="admin.product.cancel_button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.product.save_button"
              onClick={handleSaveProduct}
            >
              {editingProduct ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRM DIALOG */}
      <Dialog
        open={!!deleteConfirmId}
        onOpenChange={(open) => !open && setDeleteConfirmId(null)}
      >
        <DialogContent
          data-ocid="admin.product.delete_button"
          className="max-w-sm"
        >
          <DialogHeader>
            <DialogTitle>Delete Product?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. The product will be permanently
            removed.
          </p>
          <DialogFooter className="gap-2">
            <Button
              data-ocid="admin.product.cancel_button"
              variant="outline"
              onClick={() => setDeleteConfirmId(null)}
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.product.confirm_button"
              variant="destructive"
              onClick={() =>
                deleteConfirmId && handleDeleteConfirm(deleteConfirmId)
              }
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
