/* eslint-disable react/no-unescaped-entities */
// `app/page.js` is the UI for the `/` URL

"use client";


import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavbarAccount from "../../../../Components/navbar/navbaraccount";
import { useUserContext } from "@/context/user";
import { useAppContext } from "@/context";

import Item from "@/Components/item";




export default function Order() {
  const { all_product,currency } = useAppContext();
  const { user, setUser,user_detail,setUser_detail,order_list} = useUserContext();


  return (
    <div className="">
      <div className=" block xl:w-[1300px] w-full m-auto  items-center pt-5">
        <div className="grid grid-cols-4 gap-4">
        <NavbarAccount/>   
          <div className="col-span-3 w-full bg-purple-950 pt-4 pb-5">
            <p className="md:text-3xl text-xl text-center font-bold">MY ORDER</p>
            <p className="pt-10 pl-5 md:text-xl text-lg text-left mb-10">Order List</p>
       



         

          {order_list.length >0 && order_list.map((item,index)=>{
            return(
              <>
                   <div className="pb-4  w-[90%]   bg-slate-800 h-auto  m-auto rounded-lg">
           <div className="mt-5 flex w-full justify-between">
            <p className="pt-5 pl-5 md:text-xl text-sm">OrderNo.{item.id}</p>
            <p className="pt-5 pr-5 md:text-xl text-sm">Complete</p>
            </div>

            <div className="md:text-xl text-sm pt-2 pl-5 flex w-full justify-between">
            <div> 

            {all_product.map((e) => {
              if (item.cartData[e.id]  > 0) {
                return (
                  <>
                  <p className="">{e.title} x {item.cartData[e.id]}</p>
                  </>
                )
                }
                return null;
              })}
          
            </div>
            <div className="md:text-xl text-sm pr-5 flex items-center justify-center"> 
            <p className="">{currency.type}{(item.totalAmount *currency.value).toLocaleString() }</p>
          
            </div>
            </div>
            {/* <Link href="/user/account/information/editAccount"><button className="flex mt-5 ml-5 p-2 text-lg text-left border-white border-2  rounded-lg hover:bg-purple-600">EDIT ACCOUNT</button></Link> */}
            
            </div>



</>

            )


          })}
           </div>
        </div>
      
      </div>
    </div>
  );
}
