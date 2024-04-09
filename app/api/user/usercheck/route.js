"use server"

import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from '../../../../models/user';
// import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {

      await connectMongoDB();
      const { username } = await req.json();
      const user = await User.findOne({ username }).select("_id");
      console.log("User: ", user)

      return NextResponse.json({ user })

  } catch(error) {
      return NextResponse.json({ message: "An error occured while registering the user." }, { status: 500 })
  }
}