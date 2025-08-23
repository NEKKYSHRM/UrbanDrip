"use client";

import React, { useEffect } from "react";
import { GoHomeFill } from "react-icons/go";
import { FaBoxOpen } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import { MdPayments } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function page() {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = React.useState(session?.user || null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`/api/reload/`);
      const data = await res.json();
      console.log(data);
      if (res.status === 401) {
        signOut({ callbackUrl: "/" });
        return;
      }

      if (data?.user) {
        setUser(data.user);
      } else {
        router.push("/");
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="w-full bg-[#0A0A0A] h-screen">
      <div className="flex flex-col py-8 pl-8 pr-4 w-full border-r border-gray-800">
        <div>
          <h2 className="text-4xl text-white">URBAN DRIP</h2>
        </div>
        <ul className="py-6 flex flex-col">
          <a
            href="/"
            className="flex items-center gap-2 rounded-md text-white text-lg p-4 hover:bg-gray-800 cursor-pointer"
          >
            <GoHomeFill />
            <span>Home</span>
          </a>
          <a href="/products" className="flex items-center gap-2 rounded-md text-white text-lg p-4 hover:bg-gray-800 cursor-pointer">
            <FaBoxOpen />
            <span>Products</span>
          </a>
          <li className="flex items-center gap-2 rounded-md text-white text-lg p-4 hover:bg-gray-800 cursor-pointer">
            <MdOutlineInventory />
            <span>Inventory</span>
          </li>
          <li className="flex items-center gap-2 rounded-md text-white text-lg p-4 hover:bg-gray-800 cursor-pointer">
            <MdPayments />
            <span>Payments</span>
          </li>
          <li className="flex items-center gap-2 rounded-md text-white text-lg p-4 hover:bg-gray-800 cursor-pointer">
            <MdAccountCircle />
            <span>Account</span>
          </li>
          <button onClick={() => (signOut({callbackUrl: "/"}))} className="flex items-center gap-2 rounded-md text-white text-lg p-4 hover:bg-gray-800 cursor-pointer">
            <IoMdLogOut />
            <span>Logout</span>
          </button>
        </ul>
      </div>
    </div>
  );
}
    