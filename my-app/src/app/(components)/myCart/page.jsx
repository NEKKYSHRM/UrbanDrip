"use client";

import { useCart } from "@/context/CartContext.js";
import React, { useEffect } from "react";
import Image from "next/image";
import UserMenuBar from "@/components/UserMenuBar/page.jsx";

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart();

  return (
    <div className="w-full bg-[#0A0A0A] grid grid-cols-[25%_75%] h-screen">
      <UserMenuBar />
      <div className="p-10 text-white bg-[#080808] min-h-screen">
        <h1 className="text-4xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-400">Your cart is empty 🛒</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-[#1C1C1C] p-4 rounded-xl"
              >
                <div>
                  <h2 className="text-xl">{item.name}</h2>
                  <p className="text-gray-400">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={item.qty}
                    min={1}
                    onChange={(e) =>
                      updateQty(item._id, parseInt(e.target.value))
                    }
                    className="w-16 p-1 text-white rounded"
                  />
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-8 text-2xl font-bold">
              Total: ₹
              {cart.reduce((acc, item) => acc + item.price * item.qty, 0)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
