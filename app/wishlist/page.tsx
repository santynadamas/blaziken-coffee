"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/context/WishlistContext";
import { urlFor } from "@/lib/image";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlistStore();

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#F8F4E3] dark:bg-gray-900 px-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          Your wishlist is empty
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Add your favorite coffees to check them later.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 text-white transition bg-amber-600 rounded-xl hover:bg-amber-700"
        >
          Go to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F8F4E3] dark:bg-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="mb-8 text-4xl font-extrabold text-gray-900 dark:text-white">
          My Wishlist
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((product) => (
            <div
              key={product._id}
              className="flex flex-col overflow-hidden bg-white shadow-lg dark:bg-gray-800 rounded-3xl"
            >
              {product.image && (
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={urlFor(product.image).width(400).height(400).url()}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col justify-between flex-1 p-4">
                <div>
                  <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {product.name}
                  </h2>
                  <p className="text-lg font-semibold text-amber-600">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/product/${product.slug.current}`}
                    className="flex-1 text-center px-4 py-2 bg-[#1b0f0c] text-white rounded-xl font-semibold hover:bg-[#3b2c28] transition"
                  >
                    View Product
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="px-4 py-2 font-semibold text-white transition bg-red-600 rounded-xl hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}