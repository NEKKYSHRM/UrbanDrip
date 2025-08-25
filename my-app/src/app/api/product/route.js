import { Product } from "@/models/product.model";
import { dbconnect } from "@/db";
import { NextRequest, NextResponse } from "next/server";

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
