"use client";

import * as React from "react";
import Link from "next/link";
import { useCartStore } from "@/context/CartContext";
import { useWishlistStore } from "@/context/WishlistContext";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, PackageCheck, Clock } from "lucide-react";

type OrderStatus = "Delivered" | "Pending";

interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
}

export default function ProfilePage() {
  const { cartItems } = useCartStore();
  const { wishlistItems } = useWishlistStore();

  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null);
  const [toastVisible, setToastVisible] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  const orders: Order[] = [
    { id: "1", date: "2026-03-15", total: 25.5, status: "Delivered" },
    { id: "2", date: "2026-03-18", total: 40.0, status: "Pending" },
  ];

  const statusClasses: Record<OrderStatus, string> = {
    Delivered: "text-green-600 dark:text-green-400",
    Pending: "text-amber-700 dark:text-amber-400",
  };

  const [cartPop, setCartPop] = React.useState(false);
  const [wishlistPop, setWishlistPop] = React.useState(false);

  React.useEffect(() => {
    if (cartItems.length > 0) {
      setCartPop(true);
      const t = setTimeout(() => setCartPop(false), 500);
      return () => clearTimeout(t);
    }
  }, [cartItems.length]);

  React.useEffect(() => {
    if (wishlistItems.length > 0) {
      setWishlistPop(true);
      const t = setTimeout(() => setWishlistPop(false), 500);
      return () => clearTimeout(t);
    }
  }, [wishlistItems.length]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleLogin = () => {
    setUser({ name: "Coffee Lover", email: "coffeelover@example.com" });
    showToast("Logged in!");
  };

  const handleRegister = () => {
    setUser({ name: "New User", email: "newuser@example.com" });
    showToast("Registered!");
  };

  return (
    <main className="w-full min-h-screen px-4 py-12 bg-gradient-to-b from-[#F8F4E3] to-[#EDE7D9] dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-3 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">Your Profile</h1>
          <p className="text-lg text-gray-700 dark:text-gray-400">
            Manage your account, orders, and wishlist
          </p>
        </div>

        {!user && (
          <div className="flex justify-center gap-6">
            <button
              onClick={handleLogin}
              className="px-6 py-3 font-semibold text-white transition-transform bg-orange-500 rounded-lg shadow-lg hover:bg-orange-600 hover:scale-105"
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              className="px-6 py-3 font-semibold text-white transition-transform bg-green-500 rounded-lg shadow-lg hover:bg-green-600 hover:scale-105"
            >
              Register
            </button>
          </div>
        )}

        {user && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="bg-[#fff9f0] dark:bg-gray-800 shadow-lg rounded-3xl p-6 flex flex-col items-center gap-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-24 h-24 rounded-full bg-[#E6D8A3] dark:bg-gray-700 flex items-center justify-center text-2xl font-bold text-white animate-bounce-once">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold dark:text-white">{user.name}</h2>
              <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
            </Card>
            <Link href="/cart" className="group">
              <Card className="bg-[#E6D8A3] dark:bg-gray-700 shadow-lg rounded-3xl p-6 flex items-center gap-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative cursor-pointer">
                <ShoppingCart className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <p className="font-semibold text-white">Cart</p>
                  <p className="text-sm text-white">
                    {cartItems.length} item{cartItems.length !== 1 && "s"}
                  </p>
                </div>
                {cartItems.length > 0 && (
                  <span
                    className={`absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold transition-transform duration-300 ${
                      cartPop ? "animate-pop" : ""
                    }`}
                  >
                    {cartItems.length}
                  </span>
                )}
              </Card>
            </Link>
            <Link href="/wishlist" className="group">
              <Card className="bg-[#E6D8A3] dark:bg-gray-700 shadow-lg rounded-3xl p-6 flex items-center gap-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative cursor-pointer">
                <Heart className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <p className="font-semibold text-white">Wishlist</p>
                  <p className="text-sm text-white">
                    {wishlistItems.length} item{wishlistItems.length !== 1 && "s"}
                  </p>
                </div>
                {wishlistItems.length > 0 && (
                  <span
                    className={`absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold transition-transform duration-300 ${
                      wishlistPop ? "animate-pop" : ""
                    }`}
                  >
                    {wishlistItems.length}
                  </span>
                )}
              </Card>
            </Link>
          </div>
        )}
        {user && (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Order History</h2>
            {orders.length === 0 ? (
              <p className="text-gray-700 dark:text-gray-300">You have no orders yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {orders.map((order) => (
                  <Card
                    key={order.id}
                    className="bg-[#fff9f0] dark:bg-gray-700 shadow-md rounded-3xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <CardContent className="flex items-center justify-between gap-4 p-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-xl flex items-center justify-center ${
                            order.status === "Delivered" ? "bg-green-600" : "bg-amber-700"
                          } animate-pulse-once`}
                        >
                          {order.status === "Delivered" ? (
                            <PackageCheck className="w-6 h-6 text-white" />
                          ) : (
                            <Clock className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold dark:text-white">Order #{order.id}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">${order.total.toFixed(2)}</p>
                        <p className={`text-sm font-medium mt-1 ${statusClasses[order.status]}`}>
                          {order.status}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {toastVisible && (
        <div className="fixed px-5 py-3 text-white shadow-lg bottom-5 right-5 rounded-xl bg-amber-700 dark:bg-amber-500 animate-fadeInOut">
          {toastMessage}
        </div>
      )}

      <style jsx>{`
        @keyframes bounceOnce {
          0% { transform: scale(0.8); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-bounce-once { animation: bounceOnce 0.5s ease-out; }

        @keyframes pulseOnce {
          0% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pulse-once { animation: pulseOnce 0.6s ease-out; }

        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.5); }
          100% { transform: scale(1); }
        }
        .animate-pop { animation: pop 0.5s ease-out; }

        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(20px); }
        }
        .animate-fadeInOut { animation: fadeInOut 2.5s ease-in-out forwards; }
      `}</style>
    </main>
  );
}