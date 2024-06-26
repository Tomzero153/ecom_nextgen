"use server"

import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from '../../../../models/user';
// import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {

      await connectMongoDB();
      const { username } = await req.json();

       const userdata = await User.findOne( { username: username });

       if (userdata) {
        return NextResponse.json( userdata )
       }
       else{
        return NextResponse.json({ message: "User not found!" }, { status: 500 });
       }


  } catch(error) {
      return NextResponse.json({ message: "An error occured while registering the user." }, { status: 500 })
  }
}