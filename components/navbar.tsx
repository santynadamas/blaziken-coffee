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
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useCartStore } from "@/context/CartContext";
import { useWishlistStore } from "@/context/WishlistContext";
import blazikenImg from "@/public/blaziken-coffee.jpg";
import { motion, AnimatePresence, Variants } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { cartItems } = useCartStore();
  const { wishlistItems } = useWishlistStore();

  const totalCartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistQuantity = wishlistItems.length;

  const logoVariants: Variants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
  };

  const iconVariants: Variants = {
    hidden: { y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
    hover: { scale: 1.2, transition: { duration: 0.2 } },
  };

  const menuVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const icons = [
    { href: "/cart", icon: ShoppingCart, badge: totalCartQuantity },
    { href: "/wishlist", icon: Heart, badge: totalWishlistQuantity },
    { href: "/profile", icon: User, badge: 0 },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-[#F8F4E3] dark:bg-gray-900 border-b dark:border-gray-800 relative">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">

        <motion.div
          className="flex items-center gap-2 text-2xl font-bold text-[#1b0f0c] dark:text-white"
          initial="hidden"
          animate="visible"
          variants={logoVariants}
        >
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
        </motion.div>

        <div className="justify-center flex-1 hidden gap-12 md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">

              <NavigationMenuItem>
                <NavigationMenuTrigger className="dark:text-white">About Us</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[320px] bg-[#E6D8A3] dark:bg-gray-800 rounded-xl shadow-lg">
                    <li>
                      <NavigationMenuLink asChild>
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
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/#featured-products"
                          onClick={(e) => handleSmoothScroll(e, "/#featured-products")}
                          className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700 transition"
                        >
                          <div className="font-semibold dark:text-white">Shop</div>
                          <p className="text-xs text-gray-700 dark:text-gray-400">
                            Explore our premium coffee catalog.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="dark:text-white">Coffees</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[320px] bg-[#E6D8A3] dark:bg-gray-800 rounded-xl shadow-lg">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/coffees/beans"
                          className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700 transition"
                        >
                          <div className="font-semibold dark:text-white">Beans</div>
                          <p className="text-xs text-gray-700 dark:text-gray-400">
                            Whole beans for maximum freshness.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/coffees/ground"
                          className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700 transition"
                        >
                          <div className="font-semibold dark:text-white">Ground</div>
                          <p className="text-xs text-gray-700 dark:text-gray-400">
                            Ready-to-brew convenience.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/coffees/capsules"
                          className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700 transition"
                        >
                          <div className="font-semibold dark:text-white">Capsules</div>
                          <p className="text-xs text-gray-700 dark:text-gray-400">
                            Fast and consistent brewing.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="items-center hidden gap-6 md:flex">
          {icons.map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              animate="visible"
              variants={iconVariants}
              whileHover="hover"
              className="overflow-visible rounded-lg"
            >
              <Link href={item.href} className="relative p-3">
                <item.icon className="w-5 h-5 dark:text-white" />
                {item.badge > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-semibold text-white rounded-full shadow-lg -top-1 -right-1 bg-amber-700">
                    {item.badge}
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={iconVariants}
            whileHover="hover"
            className="overflow-visible rounded-lg"
          >
            <ModeToggle />
          </motion.div>
        </div>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6 dark:text-white" /> : <Menu className="w-6 h-6 dark:text-white" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden absolute top-full left-0 w-full bg-[#F8F4E3] dark:bg-gray-900 shadow-xl p-6 z-50 space-y-6"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >

            <div>
              <p className="font-semibold text-[#1b0f0c] dark:text-white mb-2">About Us</p>
              <Link href="/about/blazikencoffee" className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700">
                <div className="font-medium dark:text-white">BlazikenCoffee</div>
                <p className="text-xs text-gray-700 dark:text-gray-400">Our story and passion for coffee.</p>
              </Link>
              <Link
                href="/#featured-products"
                onClick={(e) => handleSmoothScroll(e, "/#featured-products")}
                className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700"
              >
                <div className="font-medium dark:text-white">Shop</div>
                <p className="text-xs text-gray-700 dark:text-gray-400">Browse all our products.</p>
              </Link>
            </div>

            <div>
              <p className="font-semibold text-[#1b0f0c] dark:text-white mb-2">Coffees</p>
              <Link href="/coffees/beans" className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700">
                <div className="font-medium dark:text-white">Beans</div>
                <p className="text-xs text-gray-700 dark:text-gray-400">Whole beans for freshness.</p>
              </Link>
              <Link href="/coffees/ground" className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700">
                <div className="font-medium dark:text-white">Ground</div>
                <p className="text-xs text-gray-700 dark:text-gray-400">Easy and ready to brew.</p>
              </Link>
              <Link href="/coffees/capsules" className="block p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700">
                <div className="font-medium dark:text-white">Capsules</div>
                <p className="text-xs text-gray-700 dark:text-gray-400">Fast and convenient coffee.</p>
              </Link>
            </div>

            <div className="flex justify-around pt-4 border-t">
              {icons.map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  animate="visible"
                  variants={iconVariants}
                  whileHover="hover"
                  className="overflow-visible rounded-lg"
                >
                  <Link
                    href={item.href}
                    className="relative p-3 rounded-lg hover:bg-[#d9c68f] dark:hover:bg-gray-700 transition shadow-sm"
                  >
                    <item.icon className="w-6 h-6 dark:text-white" />
                    {item.badge > 0 && (
                      <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-semibold text-white rounded-full shadow-lg -top-1 -right-1 bg-amber-700">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={iconVariants}
                whileHover="hover"
                className="overflow-visible rounded-lg"
              >
                <ModeToggle />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}