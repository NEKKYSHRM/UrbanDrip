"use client";

import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MenuBar from "@/components/MenuBar/page.jsx";
import { Link } from "react-router-dom";

export default function page() {
  

  return (
    <div className="w-full bg-[#0A0A0A] grid grid-cols-[20%_80%] h-screen">
      <MenuBar />
      <div className="w-4/5 p-12 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="text-gray-800 text-xl font-semibold ">
              Upcoming IPO | Dashboard
            </div>
            <button className="text-blue-600 bg-gray-50 border-2 rounded-lg border-gray-200 shadow-sm shadow-gray-50 py-1 px-4 cursor-pointer">
              <Link to="/register-ipo">Register IPO</Link>
            </button>
          </div>
          <div className="py-6 px-0">
            <table className="w-full table-auto border-collapse text-sm">
              <thead className="bg-white">
                <tr>
                  {[
                    "Company",
                    "Price Band",
                    "Open",
                    "Close",
                    "Issue Size",
                    "Issue Type",
                    "Listing Date",
                    "Status",
                    "Action",
                    "Delete/View",
                  ].map((h, idx) => (
                    <th key={idx} className="p-2 text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ipos.map((ipo, idx) => (
                  <tr key={idx} className="even:bg-gray-100 py-2">
                    <td className="p-2 ">{ipo.companyName}</td>
                    <td className="p-2 ">₹ {ipo.priceBand}</td>
                    <td className="p-2 ">{ipo.open?.slice(0, 10)}</td>
                    <td className="p-2 ">{ipo.close?.slice(0, 10)}</td>
                    <td className="p-2 ">{ipo.issueSize}</td>
                    <td className="p-2 ">{ipo.issueType}</td>
                    <td className="p-2 ">{ipo.listingDate?.slice(0, 10)}</td>
                    <td className="p-2 ">
                      <span
                        className={`px-2 py-1 rounded-xl text-xs font-medium
                  ${
                    ipo.status === "Open"
                      ? "bg-green-50 border-2 text-green-700"
                      : ipo.status === "Close"
                      ? "bg-red-50 border-2 text-red-700"
                      : ipo.status === "Listed"
                      ? "bg-blue-50 border-2 text-blue-700"
                      : "bg-yellow-50 border-2 text-yellow-700"
                  }`}
                      >
                        {ipo.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button className="bg-blue-700 text-white px-3 py-1 rounded-md">
                        <Link to={`/ipoInfo/${ipo._id}`}>Update</Link>
                      </button>
                    </td>
                    <td className="p-2 flex items-center gap-2">
                      <button
                        onClick={() => deleteIpo(ipo._id)}
                        className="text-red-600 cursor-pointer"
                      >
                        <RiDeleteBinLine className="text-2xl" />
                      </button>
                      <button className="text-black">
                        <Link to={`/ipoInfo/${ipo._id}`}>
                          <FiEye className="text-2xl" />
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}
    