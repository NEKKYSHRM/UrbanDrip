import mongoose from "mongoose";
import User from "@/models/user.model.js"

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["t-shirts", "hoodies", "pants", "shirts"], // customize for your brand
    },
    sizes: [
      {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
      },
    ],
    images: [
      {
        url: { type: String, required: true },
      },
    ],
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin or seller
    },
  },
  { timestamps: true }
);
