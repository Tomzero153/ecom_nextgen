/* eslint-disable react/no-unescaped-entities */
// `app/page.js` is the UI for the `/` URL

"use client";


import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavbarAccount from "../../../../Components/navbar/navbaraccount";
import { useUserContext } from "@/context/user";
import AddressPopup  from "../../../../Components/AddressPopup "





export default function MyAddress() {
  const { user, setUser,user_detail,setUser_detail,address_detail,setAddress_detail } = useUserContext();
  console.log("asd",user_detail.username);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // เมื่อผู้ใช้บันทึกข้อมูลแล้ว เราจะปิด pop up และเก็บข้อมูลที่อยู่



  return (
    <div className="">
      <div className=" block xl:w-[1300px] w-full m-auto  items-center pt-5">
        <div className="grid grid-cols-4 gap-4">
        <NavbarAccount/>   
          <div className="col-span-3 w-full bg-purple-950 pt-4">
            <p className="text-3xl text-center font-bold">MY ADDRESS</p>
            <p className="pt-10 pl-5 text-xl text-left">ADDRESS</p>
            <div className="mt-10 w-[90%]   bg-slate-800 h-[300px]  m-auto rounded-lg">
             {address_detail && (
              <>
              <div className=" border-b-2 w-[90%] m-auto"  >

              
           <p className="pt-10 pl-5 text-lg text-left  text-slate-300">{address_detail.name} | {address_detail.phone}</p>
            <p className="pt-1 pl-5 text-lg text-left  text-slate-300">{address_detail.address} {address_detail.city} {address_detail.state}</p>
            <p className="pt-1 pl-5 text-lg text-left  text-slate-300">{address_detail.country} {address_detail.postal}</p>
           <button className="flex mt-5 ml-5 mb-4 p-2 text-lg text-left border-white border-2  rounded-lg hover:bg-purple-600" onClick={() => setIsPopupOpen(true)}>EDIT ADDRESS</button>
            <dvi className=" border-b-2 w-[90%]"></dvi>
            </div>

</>
             )} 
            </div>
            {isPopupOpen && <AddressPopup onClose={handleClosePopup} />}



          </div>
        </div>
      
      </div>
    </div>
  );
}
