"use client";

import React, { useEffect, useState } from "react";
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

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/product");
        if (res.data.success) {
          setProducts(res.data.products); // ✅ fix
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

  const deleteProduct = async (id) => {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const res = await axios.delete(`/api/product/${id}`);
    if (res.data.success) {
      alert("Product deleted successfully");
      setProducts((prev) => prev.filter((p) => p._id !== id)); // update UI
    } else {
      alert(res.data.message || "Failed to delete");
    }
  } catch (error) {
    console.error(error);
    alert("Error deleting product");
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
        <div className="w-full p-12 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="text-gray-300 text-xl font-semibold ">
              Admin | Dashboard
            </div>
            <button
              onClick={openModal}
              className="text-black hover:bg-[#CCFF00] bg-[#ADFF2F] border-2 rounded-lg shadow-[0_0_20px_#ADFF2F] border-[#ADFF2F] shadow-[#ADFF2F] py-1 px-4 cursor-pointer"
            >
              Add Product
            </button>
          </div>
          <div className="py-6 px-0 w-full overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm">
              <thead className="bg-white">
                <tr>
                  {[
                    "Name",
                    "Description",
                    "Price",
                    "Category",
                    "Sizes",
                    "Image",
                    "Stock",
                    "Actions",
                  ].map((h, idx) => (
                    <th key={idx} className="p-2 text-left text-black">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="p-4 text-center text-white">
                      Loading...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-4 text-center text-white">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map((item, idx) => (
                    <tr key={idx} className="bg-gray-800 even:bg-gray-600 text-white">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.description}</td>
                      <td className="p-2">₹ {item.price}</td>
                      <td className="p-2">{item.category}</td>
                      <td className="p-2">{item.sizes.join(", ")}</td>
                      <td className="p-2">
                        {item.images?.length > 0 ? (
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          "No image"
                        )}
                      </td>
                      <td className="p-2">{item.stock}</td>
                      <td className="p-2 flex gap-2">
                        {/* Update */}
                        <button className="bg-blue-700 text-white px-3 py-1 rounded-md">
                          <Link href={`/products/${item._id}`}>Update</Link>
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => deleteProduct(item._id)}
                          className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
