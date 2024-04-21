"use server"

import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Address from '../../../../models/address';
import { idText } from "typescript";
// import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const slugify = require("slugify");
    // const { title } = await req.json();
    // console.log(title);
    // const { title,price,discount,qty,sellqty,img1,img2,img3,type,description } = await req.json();
    const { user,input_name,input_address,input_city,input_state,input_postal,input_country,input_phone} = await req.json();
    const numPostal = Number(input_postal)



    await connectMongoDB();

    let findID = await Address.find({});
    let id;
    if (findID.length > 0) {
      let last_product_array = findID.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }
    
    console.log("user",user);
    console.log("name",input_name);
    console.log("address",input_address);
    console.log("city",input_city);
    console.log("state",input_state);
    console.log("country",input_country);
    console.log("Postal",numPostal);
    console.log("Phone",input_phone);
    // let slug = slugify(title + "_"+id);
    // console.log("slug",slug);



    const model_address = new Address({
      id:id,
      username: user,
      name:input_name,
      address:input_address,
      city: input_country,
      state: input_state,
      postal: numPostal,
      country: input_country,
      phone:input_phone,
     
    });

    await Address.create(model_address);

    // await product.create(title,Number(price),Number(discount),Number(qty),Number(sellqty),img1,img2,img3,type,description);

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while registering the user." },
      { status: 500 }
    );
  }
}
