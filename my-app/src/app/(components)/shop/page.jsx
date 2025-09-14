"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { FiEye } from "react-icons/fi";
import toast from "react-hot-toast";
// import ProductCard from "@/components/ProductCard.jsx";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/product");
        if (res.data.success) {
          setProducts(res.data.products);
          setFiltered(res.data.products);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🔎 Search & Filter
  useEffect(() => {
    let items = products;

    if (category !== "all") {
      items = items.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search.trim()) {
      items = items.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(items);
  }, [search, category, products]);

  return (
    <div className="bg-[#0A0A0A] min-h-screen px-10 py-16">
      <h1 className="text-5xl font-bold text-[#ADFF2F] mb-8 text-center">
        Shop Our Collection
      </h1>

      {/* 🔍 Search + Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-[#1C1C1C] text-white placeholder-gray-400 border border-[#333] focus:border-[#ADFF2F] focus:outline-none"
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-lg bg-[#1C1C1C] text-white border border-[#333] focus:border-[#ADFF2F] focus:outline-none"
        >
          <option value="all">All Categories</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="shoes">Shoes</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      {/* 🛍 Product Grid */}
      {loading ? (
        <p className="text-center text-gray-400">Loading products...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }) {
  const handleAdd = () => {
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
    <div className="bg-[#1C1C1C] rounded-2xl shadow-lg hover:shadow-xl transition p-5 flex flex-col">
      {/* Image */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform"
        />
      </div>

      {/* Info */}
      <div className="mt-4 flex-1">
        <h3 className="text-lg font-semibold text-white truncate">{product.name}</h3>
        <p className="text-sm text-[#B0B0B0] line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-[#ADFF2F]">₹{product.price}</span>
          <span className="text-xs px-2 py-1 bg-[#0A0A0A] border border-[#333] rounded-full text-gray-300">
            {product.category}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-5">
        <Link href={`/product/${product._id}`}>
          <button className="flex items-center gap-1 bg-gray-200 text-black px-3 py-1 rounded-lg hover:bg-gray-300 transition">
            <FiEye /> View
          </button>
        </Link>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 bg-[#ADFF2F] text-black px-3 py-1 rounded-lg hover:bg-[#CCFF00] transition"
        >
          <ShoppingCart size={18} /> Add
        </button>
      </div>
    </div>
  );
}
