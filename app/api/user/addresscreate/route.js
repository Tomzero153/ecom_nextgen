"use server"

import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from '../../../../models/user';
// import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    console.log("Name:");
    const { username, password } = await req.json();
    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Name:",username);
    console.log("Pass:",password);
     console.log("hashedPassword:",hashedPassword);
    

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
