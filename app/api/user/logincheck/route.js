"use server";

import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
//  import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    await connectMongoDB();
    const { username, password } = await req.json();
    const user = await User.findOne({ username });
    let role = "";
    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");
    if (user) {
       role = user.role;
        const passwordMatch = await bcrypt.compare(password, user.password);
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });


      console.log(passwordMatch);
      if (passwordMatch) {
         return NextResponse.json({ passwordMatch,username,token,role })
      } else {
        console.log("fail");
        return NextResponse.json(
          { message: "Invalid username or password." },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json({ message: "User not found!" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while registering the user." },
      { status: 500 }
    );
  }
}
