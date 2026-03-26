import { Leaf } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const footerLinks = [
    {
      title: "Customer Service",
      links: ["Track Order", "Returns & Refunds", "FAQ", "Contact Us"],
    },
    {
      title: "About",
      links: ["Our Story", "Pahadi Farmers", "Sustainability", "Blog"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
  ];

  return (
    <footer className="bg-shopzone-footer text-shopzone-footer-text">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-5 h-5 text-green-400" />
              <span className="font-black text-lg uppercase tracking-tight text-white">
                ShopZone
              </span>
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "oklch(0.86 0 0 / 70%)" }}
            >
              Bringing authentic Pahadi flavors from the Himalayan farms of
              Uttarakhand straight to your table.
            </p>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <span
                      className="text-xs"
                      style={{ color: "oklch(0.86 0 0 / 70%)" }}
                    >
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div
          className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ color: "oklch(0.86 0 0 / 60%)" }}
        >
          <p>© {year} ShopZone - Pahadi Store. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
