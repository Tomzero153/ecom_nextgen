"use server"

import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from '../../../../models/user';
// import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {

      await connectMongoDB();
      const { checkUser } = await req.json();

      console.log("log", checkUser)
       const userdata = await User.findOne( { username: checkUser });

       if (userdata) {
        console.log("found: ", userdata)
       }
       else{
        console.log("not found: ")
       }
 
 
      // console.log("User: ", userdata)

      return NextResponse.json( userdata )

  } catch(error) {
      return NextResponse.json({ message: "An error occured while registering the user." }, { status: 500 })
  }
}