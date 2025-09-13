"use client";

import Image from "next/image";
import { FiEye } from "react-icons/fi";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext.js";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart 🛒`, {
      style: {
        background: "#1C1C1C",
        color: "#ADFF2F",
      },
      iconTheme: {
        primary: "#ADFF2F",
        secondary: "#0A0A0A",
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col">
      {/* Product Image */}
      <div className="relative w-full h-56 rounded-xl overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.png"}
          alt={product.name}
          width={400}
          height={400}
          className="object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="mt-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold text-[#1d1d1d]">
            ₹{product.price}
          </span>
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
            {product.category}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-4">
        <Link href={`/product/${product._id}`}>
          <button className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition cursor-pointer">
            <FiEye /> View
          </button>
        </Link>
        <button 
        onClick={handleAdd} className="flex items-center gap-1 bg-[#ADFF2F] hover:bg-[#CCFF00] text-black px-3 py-1 rounded-lg  transition cursor-pointer">
          <ShoppingCart size={18} /> Add
        </button>
      </div>
    </div>
  );
}
