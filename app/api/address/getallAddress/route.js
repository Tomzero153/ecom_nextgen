"use server"

import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Address from '../../../../models/address';
// import bcrypt from 'bcryptjs'

export async function GET() {
  try {


    await connectMongoDB();
    let allAddress = await Address.find({});
    return NextResponse.json(allAddress);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while registering the user." },
      { status: 500 }
    );
  }
}
