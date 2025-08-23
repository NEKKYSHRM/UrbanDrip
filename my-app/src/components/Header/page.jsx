"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function page({ solid = false, mode = "signup" }) {
  const [isSolid, setIsSolid] = useState(solid);
  const { data: session } = useSession();
  useEffect(() => {
    if (solid) return;
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight - 80) {
        setIsSolid(true);
      } else {
        setIsSolid(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [solid]);

  const isSignup = mode === "signup";

  console.log(session?.user);

  return (
    <div
      className={`w-full z-50 fixed text-white py-4 px-20 flex justify-between items-center transition-colors duration-300 ${
        isSolid ? "bg-[#ADFF2F]" : "bg-transparent"
      }`}
    >
      <div>
        <h2 className="text-4xl">URBAN DRIP</h2>
      </div>
      <div>
        <ul className="flex gap-10 text-lg items-center">
          <li className="hover:text-[#ADFF2F] cursor-pointer">HOME</li>
          <li className="hover:text-[#ADFF2F] cursor-pointer">SHOP</li>
          <li className="hover:text-[#ADFF2F] cursor-pointer">ABOUT</li>
          <li className="hover:text-[#ADFF2F] cursor-pointer">CONTACT</li>
          <li className="hover:text-[#ADFF2F] cursor-pointer">
            {session ? (
              session.user.role === "customer" ? (
                <a
                  href={`/${session.user.id}`}
                  className="py-0.5 px-3 cursor-pointer hover:border-[#ADFF2F]"
                >
                  PROFILE
                </a>
              ) : (
                <a
                  href="/dashboard"
                  className="py-0.5 px-3 cursor-pointer hover:border-[#ADFF2F]"
                >
                  DASHBOARD
                </a>
              )
            ) : (
              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="border-1 border-white py-0.5 px-3 cursor-pointer hover:border-[#ADFF2F]"
              >
                LOG IN
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
