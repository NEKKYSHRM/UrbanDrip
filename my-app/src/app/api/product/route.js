import { Product } from "@/models/product.model";
import { dbconnect } from "@/db";
import { NextRequest, NextResponse } from "next/server";


// Add product
export async function POST(req) {
  try {
    await dbconnect();
    const body = await req.json();
    const { name, description, price, category, sizes, images, stock } = body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      sizes,
      images,
      stock,
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error(error);
    NextResponse.json(
      { success: false, message: "Error adding product" },
      { status: 500 }
    );
  }
}

// Fetch all products
export async function GET() {
  try {
    await dbconnect();
    const products = await Product.find();
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.error(error);
    NextResponse.json(
      { success: false, message: "Error fetching products" },
      { status: 500 }
    );
  }
}