"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { useAppContext } from "@/context";


export default function Item(props) {
  const {addToCart,currency}  = useAppContext();
  const newprice = props.price - (props.price * (props.discount / 100));
  

  return (
    <div className="flex  flex-wrap lg:w-[300px]  md:w-[250px]  sm:w-[230px]  w-[200px] bg-slate-800 rounded">
       <Link href={`/main/cart/${props.slug}`}  className="w-full" >
    
      <Image
        className=" bg-white lg:h-[300px] md:h-[250px] sm:h-[230px] h-[200px] w-full   transition-transform transform hover:scale-105"
        src={props.image}
        width={500}
        height={500}
        alt=""
      />

      </Link>
      <div className="flex flex-wrap  w-full  justify-center">
        <p className="flex pt-1 text-center lg:text-xl text-lg whitespace-normal">
          {props.title.toUpperCase()}
        </p>
        <div className="lg:pt-2 hidden md:inline md:flex w-full justify-between">
          <div className="flex items-center    ">
            <div className="flex ">
              {props.discount && (
                <p className="ml-1 p-1 lg:text-2xl text-sm bg-purple-600 rounded">
                  {props.discount}%
                </p>
              )}
            </div>
            <div className="pl-2 lg:text-xl text-sm ">
              {props.discount ? (
                <>
                  <p className=" line-through">{currency.type}{(props.price *currency.value).toLocaleString() }   </p>
                  <p className=" text-purple-500">{currency.type}{(newprice*currency.value).toLocaleString() }</p>
                </>
              ) : (
                <p className=" text-purple-500">{currency.type}{(props.price *currency.value.toLocaleString())}</p>
              )}
            
            </div>
          </div>
          <button onClick={()=>{addToCart(props.itemId)}} className=" w-5/12 lg:h-12  h-8 flex flex-wrap  bg-green-500 hover:bg-purple-600 items-center justify-center rounded">
     
            <p className="lg:text-lg text-sm  text-white">ADD TO CART</p>
          </button>
        </div>
      </div>
    </div>
  );
}
