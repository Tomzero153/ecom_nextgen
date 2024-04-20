import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from '../../../../models/user';
const bcrypt = require("bcrypt");

export async function POST(req) {
  try {
    const { username,email, password } = await req.json();

    // ค้นหาผู้ใช้ด้วยusername
    const bcrypt = require("bcrypt");
    const existingUser = await User.findOne({ username: username });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (passwordMatch) {
      existingUser.email = email;
      await existingUser.save();
      return NextResponse.json(true)
   } else {
     console.log("fail");
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
