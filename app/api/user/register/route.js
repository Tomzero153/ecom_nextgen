"use server"

import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from '../../../../models/user';
// import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    console.log("Name:");
    const {email, username, password } = await req.json();
    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("email:",email);
    console.log("Name:",username);
    console.log("Pass:",password);
     console.log("hashedPassword:",hashedPassword);
    
     let cart = {};
     for (let i = 0; i < 300; i++) {
       cart[i] = 0;
     }
     const user = new User({
      email:email,
      username: username,
      password: hashedPassword,
      cartData: cart,
    });

    await connectMongoDB();
    await User.create(user);

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while registering the user." },
      { status: 500 }
    );
  }
}
