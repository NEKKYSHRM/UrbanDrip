"use client";

import React from "react";
import axios from "axios";
import Image from "next/image";
import Header from "@/components/Header/page.jsx";
import ProductCard from "@/components/ProductCard.jsx"; // ✅ import properly

export default function Home() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/product");
        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (error) {
        console.error(error);
        alert("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="w-full bg-[#0A0A0A]">
        {/* Hero Section */}
        <section className="w-full h-[42vw] overflow-hidden relative flex flex-col">
          <Image
            src={"/images/hero/hero.jpg"}
            alt="hero"
            fill
            className="object-cover z-0"
          />
          <div className="w-full h-[42vw] hero-box absolute "></div>
          <div className="z-10 relative top-40 left-30">
            <h2 className="text-white text-9xl">
              NEW <br /> ARRIVALS
            </h2>
            <button className="bg-[#ADFF2F] hover:bg-[#CCFF00] hover:text-white cursor-pointer mt-5 hero-title py-5 px-10 text-2xl shadow-[0_0_20px_#ADFF2F]">
              SHOP NOW
            </button>
          </div>
        </section>

        {/* Main */}
        <main className="w-full py-12 px-20">
          <section>
            <h2 className="text-6xl text-white mb-6">TRENDING PRODUCTS</h2>
            {loading ? (
              <p className="text-white">Loading products...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
