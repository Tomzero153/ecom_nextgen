import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Address from '../../../../models/address';

export async function POST(req) {
  try {
    const { user,input_name,input_address,input_city,input_state,input_postal,input_country,input_phone } = await req.json();
    const numPostal = Number(input_postal)
    
    const existingAddress = await Address.findOne({ username: user });
    if (!existingAddress) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
    existingAddress.name = input_name;
    existingAddress.address = input_address;
    existingAddress.city = input_city;
    existingAddress.state = input_state;
    existingAddress.postal = numPostal;
    existingAddress.country = input_country;
    existingAddress.phone = input_phone;
    await existingAddress.save();
    return NextResponse.json(true)
    
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while updating address data." },
      { status: 500 }
    );
  }
}
