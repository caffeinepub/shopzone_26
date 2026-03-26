import {
  Heart,
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import type { Page } from "../types";

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentUser: { name: string; email: string } | null;
  onLogout: () => void;
}

export default function Header({
  cartCount,
  wishlistCount,
  currentPage,
  onNavigate,
  searchQuery,
  onSearchChange,
  currentUser,
  onLogout,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Shop", page: "shop" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
  ];

  const handleSearchChange = (q: string) => {
    onSearchChange(q);
    if (q && currentPage !== "shop") {
      onNavigate("shop");
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-shopzone-announcement text-white text-xs text-center py-2 px-4">
        Free shipping on orders above ₹499 | 100% Organic Pahadi Products
      </div>

      {/* Main Header */}
      <header className="bg-shopzone-header shadow-xs sticky top-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Brand */}
            <button
              type="button"
              data-ocid="header.link"
              onClick={() => onNavigate("home")}
              className="flex flex-col items-start flex-shrink-0"
            >
              <span className="font-black text-xl uppercase tracking-tight text-foreground leading-none">
                ShopZone
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">
                Pahadi Store
              </span>
            </button>

            {/* Nav Links — desktop */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.label}
                  data-ocid="nav.link"
                  onClick={() => onNavigate(link.page)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    currentPage === link.page
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Search */}
            <div className="hidden sm:flex flex-1 max-w-xs relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                data-ocid="header.search_input"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-md bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                data-ocid="wishlist.button"
                onClick={() => onNavigate("wishlist")}
                className="relative p-2 rounded-md hover:bg-secondary transition"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                data-ocid="cart.button"
                onClick={() => onNavigate("cart")}
                className="relative p-2 rounded-md hover:bg-secondary transition"
                title="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              {/* User / Auth */}
              {currentUser ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    data-ocid="user.button"
                    onClick={() => setUserDropdownOpen((v) => !v)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-secondary transition text-sm font-medium max-w-[120px]"
                    title={currentUser.email}
                  >
                    <User className="w-4 h-4 shrink-0" />
                    <span className="truncate">
                      {currentUser.name.split(" ")[0]}
                    </span>
                  </button>
                  {userDropdownOpen && (
                    <div
                      data-ocid="user.dropdown_menu"
                      className="absolute right-0 top-full mt-1 w-44 bg-card border border-border rounded-xl shadow-card py-1 z-50 animate-fade-in"
                    >
                      <div className="px-3 py-2 border-b border-border">
                        <p className="text-xs font-semibold truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {currentUser.email}
                        </p>
                      </div>
                      <button
                        type="button"
                        data-ocid="profile.link"
                        onClick={() => {
                          onNavigate("profile");
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-secondary transition"
                      >
                        My Profile
                      </button>
                      <button
                        type="button"
                        data-ocid="user.button"
                        onClick={() => {
                          onLogout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-secondary transition flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  data-ocid="login.button"
                  onClick={() => onNavigate("login")}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-secondary transition text-sm font-medium ${
                    currentPage === "login" ? "text-primary" : "text-foreground"
                  }`}
                >
                  <User className="w-4 h-4" />
                  Login
                </button>
              )}

              <button
                type="button"
                data-ocid="admin.link"
                onClick={() => onNavigate("admin")}
                className={`p-2 rounded-md hover:bg-secondary transition ${
                  currentPage === "admin"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                title="Admin Panel"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Mobile menu toggle */}
              <button
                type="button"
                className="md:hidden p-2 rounded-md hover:bg-secondary transition"
                onClick={() => setMobileMenuOpen((v) => !v)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="sm:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                data-ocid="header.search_input"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-md bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-shopzone-header px-4 py-3 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                data-ocid="nav.link"
                onClick={() => {
                  onNavigate(link.page);
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium py-2 text-left text-foreground hover:text-primary transition"
              >
                {link.label}
              </button>
            ))}
            {currentUser ? (
              <>
                <button
                  type="button"
                  data-ocid="profile.link"
                  onClick={() => {
                    onNavigate("profile");
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm font-medium py-2 text-left text-foreground hover:text-primary transition"
                >
                  My Profile ({currentUser.name.split(" ")[0]})
                </button>
                <button
                  type="button"
                  data-ocid="user.button"
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm font-medium py-2 text-left text-destructive hover:text-primary transition flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                data-ocid="login.button"
                onClick={() => {
                  onNavigate("login");
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium py-2 text-left text-foreground hover:text-primary transition"
              >
                Login / Register
              </button>
            )}
            <button
              type="button"
              data-ocid="admin.link"
              onClick={() => {
                onNavigate("admin");
                setMobileMenuOpen(false);
              }}
              className="text-sm font-medium py-2 text-left text-muted-foreground hover:text-primary transition"
            >
              Admin Panel
            </button>
          </div>
        )}
      </header>
    </>
  );
}
