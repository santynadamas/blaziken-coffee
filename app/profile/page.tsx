"use client";

import * as React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCartStore } from "@/context/CartContext";
import { useWishlistStore } from "@/context/WishlistContext";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const user = session?.user;

  const { cartItems, cartSubTotal, cartTaxes, cartTotal } = useCartStore();
  const { wishlistItems } = useWishlistStore();

  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");

  const [name, setName] = React.useState("");
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#F8F4E3] dark:from-gray-900 dark:to-gray-800">
        <p className="text-lg text-gray-700 animate-pulse dark:text-gray-200">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  const handleLogin = async () => {
    setLoading(true);

    await signIn("credentials", {
      email: loginEmail,
      password: loginPassword,
      callbackUrl: "/profile",
    });

    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email: registerEmail,
        password: registerPassword,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      setLoading(false);
      return;
    }

    await signIn("credentials", {
      email: registerEmail,
      password: registerPassword,
      callbackUrl: "/profile",
    });

    setLoading(false);
  };

  return (
    <main className="relative min-h-screen w-full py-12 bg-gradient-to-b from-[#FFF8F0] to-[#F8F4E3] dark:from-gray-900 dark:to-gray-800 overflow-hidden">

      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 dark:opacity-20 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-6xl px-4 mx-auto sm:px-6">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            My Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Manage your account, cart and wishlist
          </p>
        </div>

        {!user ? (
          <div className="grid gap-8 md:grid-cols-2">

            {/* LOGIN */}
            <div className="p-8 transition bg-white shadow-xl dark:bg-gray-800 rounded-2xl hover:shadow-2xl">
              <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
                Sign In
              </h2>

              <input
                className="w-full p-3 mb-4 text-gray-900 bg-white border outline-none rounded-xl dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />

              <input
                className="w-full p-3 mb-6 text-gray-900 bg-white border outline-none rounded-xl dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-3 font-semibold text-white transition bg-orange-500 shadow-lg rounded-xl hover:bg-orange-600 hover:scale-105"
              >
                Login
              </button>
            </div>

            {/* REGISTER */}
            <div className="p-8 transition bg-white shadow-xl dark:bg-gray-800 rounded-2xl hover:shadow-2xl">
              <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
                Create Account
              </h2>

              <input
                className="w-full p-3 mb-4 text-gray-900 bg-white border outline-none rounded-xl dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-400"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="w-full p-3 mb-4 text-gray-900 bg-white border outline-none rounded-xl dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-400"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />

              <input
                className="w-full p-3 mb-6 text-gray-900 bg-white border outline-none rounded-xl dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-400"
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />

              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full py-3 font-semibold text-white transition shadow-lg bg-emerald-500 rounded-xl hover:bg-emerald-600 hover:scale-105"
              >
                Register
              </button>
            </div>

          </div>
        ) : (
          <div className="space-y-10">

            {/* USER */}
            <div className="p-8 text-center bg-white shadow-xl dark:bg-gray-800 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                👋 Welcome, {user.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{user.email}</p>

              <button
                onClick={() => signOut()}
                className="px-6 py-2 mt-6 text-white transition bg-red-500 shadow-lg rounded-xl hover:bg-red-600 hover:scale-105"
              >
                Logout
              </button>
            </div>

            {/* STATS */}
            <div className="grid gap-6 md:grid-cols-3">

              <div className="p-6 text-center transition bg-white shadow-md dark:bg-gray-800 rounded-2xl hover:-translate-y-1">
                <p className="text-gray-500">🛒 Cart Items</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {cartItems.length}
                </p>
              </div>

              <div className="p-6 text-center transition bg-white shadow-md dark:bg-gray-800 rounded-2xl hover:-translate-y-1">
                <p className="text-gray-500">❤️ Wishlist</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {wishlistItems.length}
                </p>
              </div>

              <div className="p-6 text-center transition bg-white shadow-md dark:bg-gray-800 rounded-2xl hover:-translate-y-1">
                <p className="text-gray-500">💰 Total</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${cartTotal.toFixed(2)}
                </p>
              </div>

            </div>

            {/* CART + WISHLIST */}
            <div className="grid gap-8 md:grid-cols-2">

              {/* CART */}
              <div className="p-6 bg-white shadow-xl dark:bg-gray-800 rounded-2xl">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  🛒 Cart
                </h2>

                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty</p>
                ) : (
                  <ul className="space-y-3">
                    {cartItems.map((item) => (
                      <li
                        key={item._id}
                        className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-700"
                      >
                        <span className="text-gray-900 dark:text-white">
                          {item.name}
                        </span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {item.quantity}x
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 text-sm text-gray-600 dark:text-gray-300">
                  <p>Subtotal: ${cartSubTotal.toFixed(2)}</p>
                  <p>Taxes: ${cartTaxes.toFixed(2)}</p>
                  <p className="font-bold text-gray-900 dark:text-white">
                    Total: ${cartTotal.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* WISHLIST */}
              <div className="p-6 bg-white shadow-xl dark:bg-gray-800 rounded-2xl">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  ❤️ Wishlist
                </h2>

                {wishlistItems.length === 0 ? (
                  <p className="text-gray-500">No items saved yet</p>
                ) : (
                  <ul className="space-y-3">
                    {wishlistItems.map((item) => (
                      <li
                        key={item._id}
                        className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-700"
                      >
                        <span className="text-gray-900 dark:text-white">
                          {item.name}
                        </span>
                        <span className="text-red-500">♥</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}