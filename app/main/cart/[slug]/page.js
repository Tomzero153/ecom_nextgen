
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context";
import Link from 'next/link'



export default function Cart({ params }) {
  const {all_product,addToCart, ChangqtyToCart,currency}  = useAppContext();
  const [product, setProduct] = useState([]);
  const [numberqty, setNumberqty] = useState(1);


  const addCart=(id)=>
 {
  ChangqtyToCart(numberqty,id)
 }


 useEffect(() => {
  setProduct(all_product.find((e) => e.slug == params.slug));
}, [all_product, params.slug]);


  return (
    typeof product !== 'object' || Object.keys(product).length === 0 ? (
      <div>No product data available</div>
    ) : (
      
    <div className=" block xl:w-[1300px] w-full m-auto  items-center pt-8">
    <div className="flex">
      <div className="md:w-2/6 ml-2">
        {product.img1&&(  <Image
          className=" bg-white md:h-[400px] h-[300px] w-full  rounded-md"
          src={product.img1}
          width={500}
          height={500}
          alt=""
        />)}
      
      </div>
      <div className="pt-4 xl:ml-20 ml-4 xl:w-3/6">
        <h1 className="md:text-3xl text-2xl text-white">{product.title.toUpperCase()}</h1>
        <div className="pt-7 ">
          <p className="md:text-2xl  text-lg">
            Catalog:
            <span> {product.type}</span>
          </p>
        </div>

        <div>
          <div className=" pt-7 md:text-2xl  text-lg ">
            {product.discount ? (
              <>
                <p className=" text-purple-500">
                {currency.type}{((product.price - product.price * (product.discount / 100))*currency.value).toLocaleString()}
                </p>
                <div className="flex">
                  <p className="line-through">{currency.type} {(product.price*currency.value).toLocaleString()}</p>
                  <p className="no-underline ml-2"> {product.discount}% </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex">
                  <p className="line-through">$ {product.price}</p>
                </div>
              </>
            )}
          </div>

          <div className="flex pt-7 md:text-2xl  text-lg ">
            <p className="">Quantity: </p>
            <input
              className="ml-2 w-[50px]  bg-gray-200 appearance-none border-2 border-gray-200 rounded   text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="number"
              // placeholder="1"
              min="1"
              value={numberqty}
              onChange={(e)=>(setNumberqty(e.target.value))}
              
            />
          </div>

          <div className="flex pt-12  md:text-2xl  text-base ">
            <button onClick={()=>{addCart(product.id)}} className="md:w-[200px] w-[100px] md:p-2 p-1 bg-purple-600  rounded-md">
             Add To Cart
            </button>
            <Link href="/main/shopcart" >
            <button onClick={()=>{addCart(product.id)}} className="md:w-[200px] w-[100px] md:p-2 p-1 ml-5 bg-purple-600  rounded-md">
            Buy Now
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="mx-2 mt-5 border-t-2  border-slate-800">
      <p className=" pt-5 text-2xl ">Description</p>
      {/* <div className="pt-5 md:text-xl text-base">
      {product.description &&(ReactHtmlParser(product.description))}
        {}
      </div> */}

<div className="pt-5 md:text-xl text-base" dangerouslySetInnerHTML={{ __html: product.description }} />
    </div>
  </div>
    )



    
  );
}
