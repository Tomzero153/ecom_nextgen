import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from '../../../../models/user';
const bcrypt = require("bcrypt");

export async function POST(req) {
  try {
    const { username,cartItems } = await req.json();

    // ค้นหาผู้ใช้ด้วยusername
    const bcrypt = require("bcrypt");
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {

      existingUser.cartData = cartItems;
      await existingUser.save();
      return NextResponse.json(true)   
    }
    else{
      return NextResponse.json(
        { message: "Invalid username or password." },
        { status: 400 }
      );
    }

  

   
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while updating user data." },
      { status: 500 }
    );
  }
}
