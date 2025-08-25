"use client";

import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MenuBar from "@/components/MenuBar/page.jsx";
import Link from "next/link";
import { set } from "mongoose";
import axios from "axios";

export default function page() {
  const [modal, setModal] = React.useState(false);

  const openModal = () => {
    setModal(true);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const [form, setForm] = React.useState({
    name: "",
    description: "",
    price: "",
    category: "",
    sizes: [],
    images: [],
    stock: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    try {
      const res = await axios.post("/api/product", form);
      if (res.data.success) {
        setModal(false);
        setForm({
          name: "",
          description: "",
          price: "",
          category: "",
          sizes: [],
          images: [],
          stock: "",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };

  return (
    <>
      {modal && (
        <div
          onClick={() => setModal(false)} // clicking background closes modal
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // stop closing when clicking inside
            className="bg-white p-6 rounded-lg shadow-lg w-[60vw] max-w-[90%] relative"
          >
            <button
              onClick={() => setModal(false)}
              className="absolute top-2 right-2 text-red-600 text-4xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="Enter product price"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Enter product description"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    required
                    onChange={handleChange}
                    id=""
                    className="w-full border-gray-200 border-2 rounded p-2 mt-1"
                  >
                    <option value="">Select</option>
                    <option value="t-shirts">T-Shirts</option>
                    <option value="hoodies">Hoodies</option>
                    <option value="pants">Pants</option>
                    <option value="shirts">Shirts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sizes (Select multiple with Ctrl/Cmd)
                  </label>
                  <select
                    name="sizes"
                    multiple
                    value={form.sizes}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sizes: Array.from(
                          e.target.selectedOptions,
                          (opt) => opt.value
                        ),
                      })
                    }
                    required
                    className="w-full border-gray-200 border-2 rounded p-2 mt-1"
                  >
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="Enter product stock"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Product Image
                  </label>
                  <input
                    type="text"
                    name="images"
                    value={form.images}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="Enter product image URL"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#ADFF2F] hover:bg-[#CCFF00] text-black font-semibold py-2 px-4 rounded-md shadow-md"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="w-full bg-[#0A0A0A] grid grid-cols-[20%_80%] h-screen">
        <MenuBar />
        <div className="w-4/5 p-12 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="text-gray-800 text-xl font-semibold ">
              Admin | Dashboard
            </div>
            <button
              onClick={openModal}
              className="text-black hover:bg-[#CCFF00] bg-[#ADFF2F] border-2 rounded-lg shadow-[0_0_20px_#ADFF2F] border-[#ADFF2F] shadow-[#ADFF2F] py-1 px-4 cursor-pointer"
            >
              Add Product
            </button>
          </div>
          <div className="py-6 px-0">
            {/* <table className="w-full table-auto border-collapse text-sm">
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
            </table> */}
          </div>
        </div>
      </div>
    </>
  );
}
