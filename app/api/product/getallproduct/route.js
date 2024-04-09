"use server"

import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Product from '../../../../models/product';
// import bcrypt from 'bcryptjs'

export async function GET() {
  try {


    await connectMongoDB();
    let products = await Product.find({});
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while registering the user." },
      { status: 500 }
    );
  }
}
