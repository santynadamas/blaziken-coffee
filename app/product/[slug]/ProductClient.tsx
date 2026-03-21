"use client";

import React, { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/image";
import { Product } from "@/types";
import { useCartStore } from "@/context/CartContext";
import { useWishlistStore } from "@/context/WishlistContext";
import { Heart } from "lucide-react";

interface ProductClientProps {
  product?: Product;
  loading?: boolean;
}

export function ProductClient({ product, loading = false }: ProductClientProps) {
  const { addToCart } = useCartStore();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlistStore();

  const [quantity, setQuantity] = useState<string>("1");
  const [notification, setNotification] = useState<string | null>(null);

  if (loading || !product) {
    return (
      <div className="relative grid items-start gap-10 md:grid-cols-2 animate-pulse">
        <div className="w-full max-w-md mx-auto bg-gray-300 dark:bg-gray-700 h-[400px] rounded-3xl" />
        <div className="space-y-6">
          <div className="w-3/4 h-12 bg-gray-300 dark:bg-gray-700 rounded-xl" />
          <div className="w-full h-6 bg-gray-300 dark:bg-gray-700 rounded-xl" />
          <div className="w-full h-6 bg-gray-300 dark:bg-gray-700 rounded-xl" />
          <div className="flex flex-wrap gap-4">
            <div className="w-24 h-8 bg-gray-300 dark:bg-gray-700 rounded-xl" />
            <div className="w-24 h-8 bg-gray-300 dark:bg-gray-700 rounded-xl" />
          </div>
          <div className="w-32 h-10 bg-gray-300 dark:bg-gray-700 rounded-xl" />
          <div className="flex gap-2">
            <div className="w-10 h-10 bg-gray-300 rounded-lg dark:bg-gray-700" />
            <div className="w-16 h-10 bg-gray-300 rounded-lg dark:bg-gray-700" />
            <div className="w-10 h-10 bg-gray-300 rounded-lg dark:bg-gray-700" />
          </div>
        </div>
      </div>
    );
  }
  const isLiked = wishlistItems.some((item) => item._id === product._id);

  const handleQuantityChange = (value: string) => {
    if (/^\d*$/.test(value)) setQuantity(value);
  };
  const incrementQuantity = () => setQuantity((prev) => String(Number(prev) + 1));
  const decrementQuantity = () =>
    setQuantity((prev) => String(Math.max(Number(prev) - 1, 1)));

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddToCart = () => {
    const qty = Number(quantity);
    if (qty < 1) return;
    addToCart(product, qty);
    showNotification(`${qty} x ${product.name} added to cart!`);
    setQuantity("1");
  };

  const handleToggleWishlist = () => {
    if (isLiked) {
      removeFromWishlist(product._id);
      showNotification(`${product.name} removed from wishlist!`);
    } else {
      addToWishlist(product);
      showNotification(`${product.name} added to wishlist!`);
    }
  };

  return (
    <div className="relative grid items-start gap-10 md:grid-cols-2">
      {product.image && (
        <div className="relative w-full max-w-md mx-auto overflow-hidden shadow-lg rounded-3xl group">
          <Image
            src={urlFor(product.image).width(500).height(400).url()}
            alt={product.name}
            width={500}
            height={400}
            className="object-cover w-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="space-y-6 text-gray-900 dark:text-white">
        <h1 className="text-4xl font-extrabold leading-tight">{product.name}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">{product.description}</p>

        <div className="flex flex-wrap gap-4">
          <div className="px-4 py-2 bg-white/60 dark:bg-gray-800 rounded-xl">
            <span className="text-sm font-semibold">Origin:</span> {product.origin}
          </div>
          <div className="px-4 py-2 bg-white/60 dark:bg-gray-800 rounded-xl">
            <span className="text-sm font-semibold">Taste:</span> {product.taste}
          </div>
        </div>

        <div className="text-3xl font-bold text-amber-600">${product.price.toFixed(2)}</div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={decrementQuantity}
            className="px-3 py-1 text-xl font-bold bg-gray-200 rounded-lg dark:bg-gray-700"
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            className="w-16 px-2 py-1 text-center border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="button"
            onClick={incrementQuantity}
            className="px-3 py-1 text-xl font-bold bg-gray-200 rounded-lg dark:bg-gray-700"
          >
            +
          </button>
          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-[#1b0f0c] text-white rounded-xl font-semibold hover:bg-[#3b2c28] transition"
          >
            Add to Cart
          </button>
          <button
            onClick={handleToggleWishlist}
            className={`flex items-center justify-center p-3 transition rounded-xl ${
              isLiked ? "bg-white" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "text-red-600" : "text-white"}`} />
          </button>
        </div>
      </div>

      {notification && (
        <div className="fixed px-5 py-3 text-white shadow-lg bottom-5 right-5 rounded-xl animate-fadeInOut bg-amber-700 dark:bg-amber-500">
          {notification}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(20px); }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}