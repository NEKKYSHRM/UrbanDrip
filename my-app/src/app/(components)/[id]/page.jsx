"use client";

import React, { useEffect } from "react";
import { GoHomeFill } from "react-icons/go";
import { AiFillShopping } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
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
    <div className="w-full bg-[#0A0A0A] grid grid-cols-[25%_75%] h-screen">
      <div className="flex flex-col py-8 px-8 w-full">
        <div>
          <h2 className="text-4xl text-white">URBAN DRIP</h2>
        </div>
        <ul className="py-6 flex flex-col">
          <a
            href="/"
            className="flex items-center gap-2 text-white text-lg p-4 hover:bg-gray-800 cursor-pointer"
          >
            <GoHomeFill />
            <span>Home</span>
          </a>
          <li className="flex items-center gap-2 text-white text-lg p-4 hover:bg-gray-800 cursor-pointer">
            <AiFillShopping />
            <span>Shop</span>
          </li>
          <li className="flex items-center gap-2 text-white text-lg p-4 hover:bg-gray-800 cursor-pointer">
            <FaShoppingCart />
            <span>My Cart</span>
          </li>
          <li className="flex items-center gap-2 text-white text-lg p-4 hover:bg-gray-800 cursor-pointer">
            <FaHistory />
            <span>Order History</span>
          </li>
          <li className="flex items-center gap-2 text-white text-lg p-4 hover:bg-gray-800 cursor-pointer">
            <MdAccountCircle />
            <span>Account</span>
          </li>
          <button onClick={() => (signOut({callbackUrl: "/"}))} className="flex items-center gap-2 text-white text-lg p-4 hover:bg-gray-800 cursor-pointer">
            <MdAccountCircle />
            <span>Logout</span>
          </button>
        </ul>
      </div>
      <div className="px-10 flex flex-col items-center">
        <div className="bg-[#1C1C1C] w-full flex flex-col m-auto items-center p-8 rounded-md shadow shadow-gray-800">
          <div className="flex items-center gap-12">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#ADFF2F] shadow-lg">
              <Image
                src={user?.avatar || "/default-avatar.png"}
                alt="Avatar"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-3xl text-white">{user?.name}</h2>
              <p className="text-white">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
