"use server"

import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Product from '../../../../models/product';
// import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const slugify = require("slugify");
    // const { title } = await req.json();
    // console.log(title);
    // const { title,price,discount,qty,sellqty,img1,img2,img3,type,description } = await req.json();
    const { title,price,discount,qty,sellqty,img1,img2,img3,type,description} = await req.json();
    const numPrice = Number(price)
    const numDiscount = Number(discount)
    const numQty = Number(qty)
    const numSellqty = Number(sellqty)



    await connectMongoDB();

    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }

    let slug = slugify(title + "_"+id);
    console.log("slug",slug);



    const product = new Product({
      id: id,
      title:title,
      slug:slug,
      price: numPrice,
      discount: numDiscount,
      qty: numQty,
      sellqty: numSellqty,
      img1:img1,
      img2:img2,
      img3:img3,
      type:type,
      description:description,
    });

    await Product.create(product);

    // await product.create(title,Number(price),Number(discount),Number(qty),Number(sellqty),img1,img2,img3,type,description);

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while registering the user." },
      { status: 500 }
    );
  }
}
