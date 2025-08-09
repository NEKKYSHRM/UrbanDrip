"use client";

import React, {useState, useEffect} from 'react';

export default function page({solid = false}) {
    const [isSolid, setIsSolid] = useState(solid);
    useEffect(() => {
        if(solid) return;
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
  return (
    <div className={`w-full z-50 fixed text-white py-4 px-20 flex justify-between items-center transition-colors duration-300 ${
        isSolid ? "bg-[#ADFF2F]" : "bg-transparent"
      }`}>
        <div>
            <h2 className='text-4xl'>URBAN DRIP</h2>
        </div>
        <div>
            <ul className='flex gap-10 text-lg items-center'>
                <li className='hover:text-[#ADFF2F] cursor-pointer'>HOME</li>
                <li className='hover:text-[#ADFF2F] cursor-pointer'>SHOP</li>
                <li className='hover:text-[#ADFF2F] cursor-pointer'>ABOUT</li>
                <li className='hover:text-[#ADFF2F] cursor-pointer'>CONTACT</li>
                <li className='hover:text-[#ADFF2F] cursor-pointer'><button className='border-1 border-white py-0.5 px-3 hover:border-[#ADFF2F]'>LOG IN</button></li>
            </ul>
        </div>
    </div>
  )
}
