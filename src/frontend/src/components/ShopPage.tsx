import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { Page, Product } from "../types";
import ProductCard from "./ProductCard";

interface ShopPageProps {
  products: Product[];
  isInCart: (id: string) => boolean;
  isInWishlist: (id: string) => boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onNavigate: (page: Page, productId?: string) => void;
  searchQuery: string;
}

type SortOption =
  | "default"
  | "price_asc"
  | "price_desc"
  | "rating"
  | "name_asc";

export default function ShopPage({
  products,
  isInCart,
  isInWishlist,
  onAddToCart,
  onToggleWishlist,
  onNavigate,
  searchQuery,
}: ShopPageProps) {
  const allCategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products],
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setMinRating(0);
    setInStockOnly(false);
    setSortBy("default");
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    minPrice !== "" ||
    maxPrice !== "" ||
    minRating > 0 ||
    inStockOnly ||
    sortBy !== "default";

  const filtered = useMemo(() => {
    let result = [...products];

    // search
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // price
    const min = minPrice !== "" ? Number(minPrice) : null;
    const max = maxPrice !== "" ? Number(maxPrice) : null;
    if (min !== null) result = result.filter((p) => p.price >= min);
    if (max !== null) result = result.filter((p) => p.price <= max);

    // rating
    if (minRating > 0) result = result.filter((p) => p.rating >= minRating);

    // stock
    if (inStockOnly) result = result.filter((p) => p.inStock);

    // sort
    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name_asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [
    products,
    searchQuery,
    selectedCategories,
    minPrice,
    maxPrice,
    minRating,
    inStockOnly,
    sortBy,
  ]);

  const FilterPanel = () => (
    <aside className="space-y-6">
      {/* Sort */}
      <div>
        <h3 className="font-bold text-sm uppercase tracking-wider mb-3">
          Sort By
        </h3>
        <Select
          value={sortBy}
          onValueChange={(v) => setSortBy(v as SortOption)}
        >
          <SelectTrigger data-ocid="shop.select" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
            <SelectItem value="name_asc">Name A–Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Category */}
      <div>
        <h3 className="font-bold text-sm uppercase tracking-wider mb-3">
          Category
        </h3>
        <div className="space-y-2">
          {allCategories.map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat}`}
                data-ocid="shop.checkbox"
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
              />
              <Label
                htmlFor={`cat-${cat}`}
                className="text-sm cursor-pointer capitalize"
              >
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-bold text-sm uppercase tracking-wider mb-3">
          Price Range (₹)
        </h3>
        <div className="flex items-center gap-2">
          <Input
            data-ocid="shop.input"
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full"
            min={0}
          />
          <span className="text-muted-foreground">–</span>
          <Input
            data-ocid="shop.input"
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full"
            min={0}
          />
        </div>
      </div>

      <Separator />

      {/* Minimum Rating */}
      <div>
        <h3 className="font-bold text-sm uppercase tracking-wider mb-3">
          Min. Rating
        </h3>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              data-ocid="shop.toggle"
              onClick={() => setMinRating(minRating === star ? 0 : star)}
              className="p-1 transition"
              title={`${star} star${star > 1 ? "s" : ""}+`}
            >
              <Star
                className={`w-5 h-5 ${
                  star <= minRating
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
          {minRating > 0 && (
            <button
              type="button"
              onClick={() => setMinRating(0)}
              className="ml-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      <Separator />

      {/* In Stock */}
      <div className="flex items-center justify-between">
        <Label
          htmlFor="in-stock"
          className="font-bold text-sm uppercase tracking-wider cursor-pointer"
        >
          In Stock Only
        </Label>
        <Switch
          id="in-stock"
          data-ocid="shop.switch"
          checked={inStockOnly}
          onCheckedChange={setInStockOnly}
        />
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          data-ocid="shop.secondary_button"
          className="w-full"
        >
          <X className="w-4 h-4 mr-2" /> Clear All Filters
        </Button>
      )}
    </aside>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
            Browse
          </p>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Our Products
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Showing <strong>{filtered.length}</strong> of{" "}
            <strong>{products.length}</strong> products
          </span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filtered
            </Badge>
          )}
          {/* Mobile filter toggle */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setFiltersOpen((v) => !v)}
            data-ocid="shop.toggle"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            {filtersOpen ? (
              <ChevronUp className="w-4 h-4 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-1" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <div className="hidden md:block w-60 shrink-0">
          <FilterPanel />
        </div>

        {/* Mobile filter panel */}
        {filtersOpen && (
          <div className="md:hidden w-full mb-6 border border-border rounded-xl p-5 bg-card">
            <FilterPanel />
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {!filtersOpen && <div className="md:hidden" />}
          {filtered.length === 0 ? (
            <div
              data-ocid="shop.empty_state"
              className="text-center py-20 text-muted-foreground"
            >
              <SlidersHorizontal className="w-10 h-10 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">
                No products match your filters.
              </p>
              <p className="text-sm mt-1">
                Try adjusting or clearing the filters.
              </p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={clearFilters}
                  data-ocid="shop.secondary_button"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  inCart={isInCart(product.id)}
                  inWishlist={isInWishlist(product.id)}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  onNavigate={onNavigate}
                  index={idx + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
