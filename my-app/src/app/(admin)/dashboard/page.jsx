"use client";

import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MenuBar from "@/components/MenuBar/page.jsx";

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
    <div className="w-full bg-[#0A0A0A] grid grid-cols-[20%_80%] h-screen">
      <MenuBar/>
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
    