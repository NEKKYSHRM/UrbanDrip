import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    avatar: {
      type: String,
      // default:
    },
    addresses: [
      {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
      },
    ],
    // orderHistory: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Order",
    //   },
    // ],
  },
  {
    timestamp: true,
  }
);

export const User = mongoose.model.User || mongoose.model("User", userSchema)
