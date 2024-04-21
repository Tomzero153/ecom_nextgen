"use server"

import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Order from '../../../../models/order';
// import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {

      await connectMongoDB();
      const { username } = await req.json();

       const Order_list = await Order.find( { username: username });

       if (Order_list) {
        return NextResponse.json( Order_list )
       }
       else{
        return NextResponse.json({ message: "User not found!" }, { status: 500 });
       }


  } catch(error) {
      return NextResponse.json({ message: "An error occured while registering the user." }, { status: 500 })
  }
}