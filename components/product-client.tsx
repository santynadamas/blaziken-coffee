/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo, useEffect } from "react";
import { Product, Origin, Taste } from "@/types";
import { useCartStore } from "@/context/CartContext";
import { useWishlistStore } from "@/context/WishlistContext";
import { urlFor } from "@/lib/image";
import { Heart } from "lucide-react";
import Link from "next/link";

interface ProductFilterProps {
  products: Product[];
  loading?: boolean;
}

const ORIGINS: (Origin | "all")[] = ["all", "america", "europa", "asia", "oceania", "africa"];
const TASTES: (Taste | "all")[] = ["all", "citric", "sweet"];

export default function ProductFilter({ products, loading = false }: ProductFilterProps) {
  const { addToCart } = useCartStore();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlistStore();

  const [selectedOrigin, setSelectedOrigin] = useState<Origin | "all">("all");
  const [selectedTaste, setSelectedTaste] = useState<Taste | "all">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cartToastCount, setCartToastCount] = useState<number>(0);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const originMatch = selectedOrigin === "all" || p.origin === selectedOrigin;
      const tasteMatch = selectedTaste === "all" || p.taste === selectedTaste;
      return originMatch && tasteMatch;
    });
  }, [products, selectedOrigin, selectedTaste]);

  const isInWishlist = (id: string) => wishlistItems.some(p => p._id === id);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setCartToastCount(prev => prev + 1);
    setToastMessage(`${cartToastCount + 1} item(s) added to cart`);
  };

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      setToastMessage(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      setToastMessage(`${product.name} added to wishlist`);
    }
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const skeletonArray = [1, 2, 3, 4];

  return (
    <div className="w-full px-4 py-6 bg-[#F8F4E3] dark:bg-gray-900 relative">

      {toastMessage && (
        <div className="fixed z-50 px-5 py-3 text-white shadow-lg bottom-5 right-5 bg-amber-600 rounded-xl animate-fadeInOut">
          {toastMessage}
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {ORIGINS.map((o) => (
          <button
            key={o}
            onClick={() => setSelectedOrigin(o)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors
              ${selectedOrigin === o ? "bg-[#1b0f0c] text-white" : "bg-[#E6D8A3] text-gray-900 hover:bg-[#DCCF97]"}`}
          >
            {o === "all" ? "All Origins" : o.charAt(0).toUpperCase() + o.slice(1)}
          </button>
        ))}
        {TASTES.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTaste(t)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors
              ${selectedTaste === t ? "bg-[#1b0f0c] text-white" : "bg-[#E6D8A3] text-gray-900 hover:bg-[#DCCF97]"}`}
          >
            {t === "all" ? "All Tastes" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {loading
          ? skeletonArray.map((s) => (
              <div
                key={s}
                className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%] flex flex-col rounded-2xl shadow-md overflow-hidden animate-pulse"
              >

                <div className="w-full bg-gray-300 dark:bg-gray-700 h-44 rounded-t-2xl" />
                <div className="flex flex-col gap-2 p-3">
                  <div className="w-3/4 h-5 bg-gray-300 rounded dark:bg-gray-700" />
                  <div className="w-1/2 h-4 bg-gray-300 rounded dark:bg-gray-700" />
                  <div className="w-1/3 h-4 bg-gray-300 rounded dark:bg-gray-700" />
                  <div className="w-full h-8 mt-2 bg-gray-300 rounded dark:bg-gray-700" />
                  <div className="w-full h-8 mt-2 bg-gray-300 rounded dark:bg-gray-700" />
                </div>
              </div>
            ))
          : filteredProducts.length === 0 && (
              <p className="w-full py-10 text-center text-gray-500">No products match the selected filters.</p>
            )}

        {!loading &&
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%] flex flex-col rounded-2xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                href={`/product/${product.slug.current}`}
                className="group relative flex flex-col bg-[#E6D8A3] dark:bg-gray-800 rounded-2xl overflow-hidden"
              >
                <div className="relative">
                  {product.image ? (
                    <img
                      src={urlFor(product.image).width(300).height(200).url()}
                      alt={product.name}
                      className="object-cover w-full transition-transform duration-300 h-44 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full text-gray-400 bg-gray-200 h-44">
                      No image
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleWishlistToggle(product);
                    }}
                    className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors z-10 ${
                      isInWishlist(product._id) ? "bg-red-100 hover:bg-red-200" : "bg-white/80 hover:bg-white"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isInWishlist(product._id) ? "text-red-500" : "text-gray-800"
                      }`}
                      fill={isInWishlist(product._id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <div className="flex flex-col gap-1 p-3">
                  <h3 className="font-bold text-gray-900 text-md dark:text-white">{product.name}</h3>
                  {product.description && (
                    <p className="flex-1 text-xs text-gray-700 dark:text-gray-300">{product.description}</p>
                  )}
                  <p className="mt-1 text-sm font-semibold text-amber-700 dark:text-amber-400">
                    ${product.price.toFixed(2)}
                  </p>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className="mt-2 py-1.5 w-full bg-black text-white rounded-lg hover:bg-[#3b2c28] transition-colors text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}