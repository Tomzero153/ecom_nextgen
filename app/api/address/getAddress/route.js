"use server"

import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Address from '../../../../models/address';
// import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {

      await connectMongoDB();
      const { username } = await req.json();

       const address_data = await Address.findOne( { username: username });

       if (address_data) {
        return NextResponse.json( address_data )
       }
       else{
        return NextResponse.json({ message: "User not found!" }, { status: 500 });
       }


  } catch(error) {
      return NextResponse.json({ message: "An error occured while registering the user." }, { status: 500 })
  }
}