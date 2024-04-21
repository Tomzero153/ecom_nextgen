"use server"

import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Order from '../../../../models/order';
// import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {

    const {username,address,cartData,totalAmount} = await req.json();
    console.log("username",username);
    console.log("address",address);
    console.log("cartData",cartData);
    console.log("totalAmount",totalAmount);
    const numTotalAmount = Number(totalAmount)



    await connectMongoDB();

    let Orders = await Order.find({});
    let id;
    if (Orders.length > 0) {
      let last_product_array = Orders.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }

    console.log("id",id);
    const order = new Order({
      id: id,
      username:username,
      address:address,
      cartData: cartData,
      totalAmount: numTotalAmount,
    });

    await Order.create(order);

    // await product.create(title,Number(price),Number(discount),Number(qty),Number(sellqty),img1,img2,img3,type,description);

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.log("error",error);
    return NextResponse.json(
      { message: error},
      { status: 500 }
    );
  }
}
