import { Product } from "@/models/product.model";
import { dbconnect } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await dbconnect();

  try {
    const product = await Product.findByIdAndDelete(params.id);
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error deleting product" }, { status: 500 });
  }
}