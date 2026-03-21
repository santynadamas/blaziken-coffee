"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useCartStore } from "@/context/CartContext";
import { useWishlistStore } from "@/context/WishlistContext";
import blazikenImg from "@/public/blaziken-coffee.jpg";

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  const cartItems = useCartStore().cartItems;
  const wishlistItems = useWishlistStore().wishlistItems;

  const totalCartQuantity = React.useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );
  const totalWishlistQuantity = React.useMemo(
    () => wishlistItems.length,
    [wishlistItems]
  );

  const icons = [
    { href: "/cart", icon: ShoppingCart, badge: totalCartQuantity },
    { href: "/wishlist", icon: Heart, badge: totalWishlistQuantity },
    { href: "/profile", icon: User, badge: 0 },
  ];

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
      setOpen(false); // cerrar menú mobile
    }
  };

  return (
    <header className="bg-[#F8F4E3] dark:bg-gray-900 border-b dark:border-gray-800 relative">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold text-[#1b0f0c] dark:text-white">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src={blazikenImg}
                alt="Blaziken Coffee Logo"
                fill
                sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 50px"
                className="object-cover rounded-full"
              />
            </div>
            <span>BlazikenCoffee</span>
          </Link>
        </div>

        {/* Menu Desktop */}
        <div className="justify-center flex-1 hidden gap-12 md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              {/* About Us */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="dark:text-white">
                  About Us
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-[360px] bg-[#E6D8A3] dark:bg-gray-800 rounded-xl shadow-lg">
                    <Link
                      href="/about/blazikencoffee"
                      className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700 transition"
                    >
                      <div className="font-semibold text-[#1b0f0c] dark:text-white">
                        BlazikenCoffee
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-400">
                        Learn about our origins, passion, and mission.
                      </p>
                    </Link>
                    <Link
                      href="/#featured-products"
                      onClick={(e) =>
                        handleSmoothScroll(e, "/#featured-products")
                      }
                      className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700 transition"
                    >
                      <div className="font-semibold dark:text-white">Shop 🛒</div>
                      <p className="text-xs text-gray-700 dark:text-gray-400">
                        Explore our premium coffee catalog.
                      </p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Coffees */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="dark:text-white">
                  Coffees
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 w-[480px] bg-[#E6D8A3] dark:bg-gray-800 rounded-xl shadow-lg">
                    <Link
                      href="/coffees/beans"
                      className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700 transition"
                    >
                      <div className="font-semibold dark:text-white">Beans ☕</div>
                      <p className="text-xs text-gray-700 dark:text-gray-400">
                        Whole beans for maximum freshness.
                      </p>
                    </Link>
                    <Link
                      href="/coffees/ground"
                      className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700 transition"
                    >
                      <div className="font-semibold dark:text-white">Ground 🫘</div>
                      <p className="text-xs text-gray-700 dark:text-gray-400">
                        Ready-to-brew convenience.
                      </p>
                    </Link>
                    <Link
                      href="/coffees/capsules"
                      className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700 transition"
                    >
                      <div className="font-semibold dark:text-white">Capsules 💊</div>
                      <p className="text-xs text-gray-700 dark:text-gray-400">
                        Fast and consistent brewing.
                      </p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Icons Desktop */}
        <div className="items-center hidden gap-6 md:flex">
          {icons.map((item, i) => (
            <div key={i} className="relative flex items-center justify-center">
              <Link href={item.href} className="flex items-center justify-center p-3">
                <item.icon className="w-5 h-5 dark:text-white" />
                {item.badge > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-semibold text-white rounded-full shadow-lg -top-1 -right-1 bg-amber-700">
                    {item.badge}
                  </span>
                )}
              </Link>
            </div>
          ))}
          <ModeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <X className="w-6 h-6 dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#F8F4E3] dark:bg-gray-900 shadow-xl p-6 z-50 space-y-6">
          {/* About Us */}
          <div>
            <p className="font-semibold text-[#1b0f0c] dark:text-white mb-2">About Us</p>
            <Link
              href="/about/blazikencoffee"
              className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700"
            >
              <div className="font-medium dark:text-white">BlazikenCoffee</div>
              <p className="text-xs text-gray-700 dark:text-gray-400">
                Our story and passion for coffee.
              </p>
            </Link>
            <Link
              href="/#featured-products"
              onClick={(e) => handleSmoothScroll(e, "/#featured-products")}
              className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700"
            >
              <div className="font-medium dark:text-white">Shop 🛒</div>
              <p className="text-xs text-gray-700 dark:text-gray-400">
                Browse all our products.
              </p>
            </Link>
          </div>

          {/* Coffees */}
          <div>
            <p className="font-semibold text-[#1b0f0c] dark:text-white mb-2">Coffees</p>
            <Link
              href="/coffees/beans"
              className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700"
            >
              <div className="font-medium dark:text-white">Beans ☕</div>
              <p className="text-xs text-gray-700 dark:text-gray-400">
                Whole beans for freshness.
              </p>
            </Link>
            <Link
              href="/coffees/ground"
              className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700"
            >
              <div className="font-medium dark:text-white">Ground 🫘</div>
              <p className="text-xs text-gray-700 dark:text-gray-400">
                Ready-to-brew convenience.
              </p>
            </Link>
            <Link
              href="/coffees/capsules"
              className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700"
            >
              <div className="font-medium dark:text-white">Capsules 💊</div>
              <p className="text-xs text-gray-700 dark:text-gray-400">
                Fast and consistent brewing.
              </p>
            </Link>
          </div>

          {/* Icons Mobile */}
          <div className="flex justify-around pt-4 border-t">
            {icons.map((item, i) => (
              <div key={i} className="relative flex items-center justify-center">
                <Link
                  href={item.href}
                  className="flex items-center justify-center p-2 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700 transition"
                >
                  <item.icon className="w-6 h-6 dark:text-white" />
                  {item.badge > 0 && (
                    <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-semibold text-white rounded-full shadow-lg -top-1 -right-1 bg-amber-700">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </div>
            ))}
            <ModeToggle />
          </div>
        </div>
      )}
    </header>
  );
}