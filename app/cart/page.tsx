/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/context/CartContext";
import { urlFor } from "@/lib/image";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    cartSubTotal,
    cartTaxes,
    cartTotal,
    updateQuantity,
  } = useCartStore();

  const [notification, setNotification] = useState<string | null>(null);

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    setNotification(`${name} was removed from your cart`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePay = () => {
    if (cartItems.length === 0) return;

    cartItems.forEach(item => removeFromCart(item._id));

    setNotification(`🎉 Purchase successful! Total paid: $${cartTotal.toFixed(2)}`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F4E3] dark:bg-gray-900 relative overflow-hidden">
      <div className="max-w-6xl px-4 py-16 mx-auto">
        {notification && (
          <div className="fixed z-50 px-5 py-3 text-white shadow-lg bottom-5 right-5 rounded-xl animate-fadeInOut bg-amber-700 dark:bg-amber-500">
            {notification}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-[80vh]">
            <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
              Shopping Cart
            </h1>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Add your favorite coffees to the cart to purchase them.
            </p>
            <Link
              href="/shop"
              className="px-6 py-3 text-white transition bg-amber-600 rounded-xl hover:bg-amber-700"
            >
              Go to shop
            </Link>
          </div>
        ) : (
          <>
            <h1 className="mb-8 text-4xl font-extrabold text-gray-900 dark:text-white">
              Shopping Cart
            </h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col overflow-hidden bg-white shadow-lg dark:bg-gray-800 rounded-3xl"
                >
                  {item.image && (
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <img
                        src={urlFor(item.image).width(400).height(400).url()}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}

                  <div className="flex flex-col justify-between flex-1 p-4">
                    <div>
                      <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                        {item.name}
                      </h2>
                      <p className="text-lg font-semibold text-amber-600">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                        className="w-20 px-2 py-1 mt-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <button
                      onClick={() => handleRemove(item._id, item.name)}
                      className="px-4 py-2 mt-4 font-semibold text-white transition bg-red-600 rounded-xl hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-end mt-6 space-y-2">
              <p className="text-gray-900 dark:text-white">
                Subtotal: ${cartSubTotal.toFixed(2)}
              </p>
              <p className="text-gray-900 dark:text-white">
                Taxes (10%): ${cartTaxes.toFixed(2)}
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                Total: ${cartTotal.toFixed(2)}
              </p>
              <button
                onClick={handlePay}
                className="px-6 py-3 mt-4 font-bold text-white transition bg-amber-600 rounded-xl hover:bg-amber-700"
              >
                Pay Now
              </button>
            </div>
          </>
        )}
      </div>

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