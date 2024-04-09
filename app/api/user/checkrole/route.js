"use server"
//not use

import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from '../../../../models/user';


export async function POST(req) {
  try {
      await connectMongoDB();
      const { username,password } = await req.json();
      const user = await User.findOne({ username });
      let role = "";
      if (user) {
        console.log(user.role);
         if(user.role == "admin")
         {
            role = "admin";
                return NextResponse.json({role} )
         }
         else{
            role = "user";

            return NextResponse.json({role} )
        } 
    } else {
        return NextResponse.json({ message: "User not found!" }, { status: 500 })

    }


  } catch(error) {
      return NextResponse.json({ message: "An error occured while registering the user." }, { status: 500 })
  }
}