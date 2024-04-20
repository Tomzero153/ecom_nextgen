/* eslint-disable react/no-unescaped-entities */
// `app/page.js` is the UI for the `/` URL

"use client";


import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavbarAccount from "../../../../Components/navbar/navbaraccount";
import { useUserContext } from "@/context/user";




export default function Information() {
  const { user, setUser,user_detail,setUser_detail } = useUserContext();
  console.log("asd",user_detail.username);

  return (
    <div className="">
      <div className=" block xl:w-[1300px] w-full m-auto  items-center pt-5">
        <div className="grid grid-cols-4 gap-4">
        <NavbarAccount/>   
          <div className="col-span-3 w-full bg-purple-950 pt-4">
            <p className="text-3xl text-center font-bold">MY ACCOUNT</p>
            <p className="pt-10 pl-5 text-xl text-left">ACCOUNT INFORMATION</p>
            <div className="mt-10 w-[90%]   bg-slate-800 h-[300px]  m-auto rounded-lg">
            <p className="pt-5 pl-5 text-lg text-left">CONTACT INFORMATION</p>
            <p className="pt-5 pl-5 text-lg text-left  text-slate-300">{user_detail.username}</p>
            <p className="pt-1 pl-5 text-lg text-left  text-slate-300">{user_detail.email}</p>
           
          
            <Link href="/user/account/information/editAccount"><button className="flex mt-5 ml-5 p-2 text-lg text-left border-white border-2  rounded-lg hover:bg-purple-600">EDIT ACCOUNT</button></Link>
            <Link href="/user/account/information/editPassword"><button className="flex mt-5 ml-5 p-2 text-lg text-left border-white border-2  rounded-lg  hover:bg-purple-600">EDIT PASSWORD</button></Link>

       
           
            </div>



          </div>
        </div>
      
      </div>
    </div>
  );
}
