"use client";

import Image from "next/image";
import Header from "@/components/Header/page.jsx";
 
export default function AboutPage() {
  return (
    <>
    {/* <Header/> */}
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center py-12 px-6">
      <div className="max-w-5xl w-full bg-[#1C1C1C] shadow-lg rounded-2xl p-10">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-[#ADFF2F] mb-6">
          About Us
        </h1>

        {/* Intro */}
        <p className="text-[#B0B0B0] text-lg leading-relaxed text-center mb-10">
          Welcome to{" "}
          <span className="font-semibold text-white">Our Store</span>, 
          where we bring you the best products with unmatched quality and service. 
          Our mission is to make shopping simple, enjoyable, and reliable.
        </p>

        {/* Image + Text Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative w-full h-64 rounded-xl overflow-hidden border border-[#ADFF2F]/30">
            <Image
              src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?cs=srgb&dl=pexels-hillaryfox-1595385.jpg&fm=jpg"
              alt="Team working"
              fill
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Our Story
            </h2>
            <p className="text-[#B0B0B0] leading-relaxed">
              Started with a small idea, we’ve grown into a platform trusted 
              by hundreds of customers. Every product is carefully chosen and 
              delivered with passion. We believe in quality, transparency, and 
              long-term relationships with our community.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 mt-12">
          <div className="bg-[#0A0A0A] p-6 rounded-xl border border-[#ADFF2F]/20 hover:border-[#CCFF00]/40 transition">
            <h3 className="text-xl font-semibold text-[#ADFF2F] mb-2">Our Mission</h3>
            <p className="text-[#B0B0B0]">
              To deliver products that make life better, more comfortable, 
              and sustainable while keeping customer satisfaction our top priority.
            </p>
          </div>
          <div className="bg-[#0A0A0A] p-6 rounded-xl border border-[#ADFF2F]/20 hover:border-[#CCFF00]/40 transition">
            <h3 className="text-xl font-semibold text-[#ADFF2F] mb-2">Our Vision</h3>
            <p className="text-[#B0B0B0]">
              To become a trusted global brand known for quality, 
              innovation, and customer care.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          {/* <h3 className="text-2xl font-bold text-white mb-3">Join Us</h3>
          <p className="text-[#B0B0B0] mb-6">
            Be part of our journey. Explore our featured products and see why customers love us.
          </p> */}
          <a
            href="/"
            className="px-6 py-3 bg-[#ADFF2F] text-black rounded-xl font-medium hover:bg-[#CCFF00] transition"
          >
            Back To Home
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
