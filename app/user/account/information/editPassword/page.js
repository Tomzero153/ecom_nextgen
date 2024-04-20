/* eslint-disable react/no-unescaped-entities */
// `app/page.js` is the UI for the `/` URL

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavbarAccount from "../../../../../Components/navbar/navbaraccount";
import { useUserContext } from "@/context/user";
import Swal from "sweetalert2";

export default function Information() {
  const { user, setUser, user_detail, setUser_detail,checkUser,setCheckUser ,effect, setEffect } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error_password, setError_password] = useState("");
  const [newpassword, setNewpassword] = useState("");

  const username = user_detail.username;
  console.log("asd", user_detail.username);



  const confirmPassword_onChange = (e) => {
    const passwordValue = e.target.value;
    setConfirmpassword(passwordValue);

    if (passwordValue == newpassword  &&  passwordValue.length > 1) {
      setError_password("");
      console.log("email", "true");
    } else {
      setError_password("Password not match");
      // ใส่โค้ดสำหรับแสดงข้อความหรือการแจ้งเตือนถ้าอีเมลไม่ถูกต้อง
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    console.log(confirmpassword);
    console.log(newpassword);

    if (!username || !password || !confirmpassword || !newpassword) {
      Swal.fire("Oops...", "Please complete all inputs.", "error");
      return;
    }
    if(confirmpassword == newpassword )
    {

    checkpassword();
    }
    else
    {
      Swal.fire("Oops...", "password not match", "error");
    }


  };


  async function checkpassword() {
    try {
      const res = await fetch("/api/user/editPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password,newpassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
       ;
      }
      if (data == true) {
        setEffect(prevEffect => !prevEffect);
        Swal.fire("OK", "Update email successful ly!", "success");
        console.log( "sucess");
        return;
      }
    } catch (error) {
      Swal.fire("Oops...", error.message, "error");
    }
  }
  return (
    <div className="">
      <div className=" block xl:w-[1300px] w-full m-auto  items-center pt-5">
        <div className="grid grid-cols-4 gap-4">
          <NavbarAccount />
          <div className="col-span-3 w-full bg-purple-950 pt-4">
            <p className="text-3xl text-center font-bold">EDIT ACCOUNT</p>
            <p className="pt-10 pl-5 text-xl text-left">ACCOUNT INFORMATION</p>
            <div className="mt-10 mb-10 w-[90%]   bg-slate-800 h-auto  m-auto rounded-lg">
            
            <form onSubmit={handleSubmit} className="">
           
              <p className="pt-5 pl-5 text-lg text-left">EDIT ACCOUNT</p>
   
              <p className="pt-5 pl-5 text-lg text-left  text-slate-300">
                ENTER CURRENT PASSWORD
              </p>
              <div className="md:w-[50%] relative mt-2 mb-5 ">
              
                <input
                  className="bg-gray-200  border-2 border-gray-200 rounded w-full ml-5 py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="password"
                  placeholder="******************"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
             
              </div>

              <p className="pt-2 pl-5 text-lg text-left  text-slate-300">
                ENTER NEW PASSWORD
              </p>
              <div className="md:w-[50%] relative mt-2 mb-5 ">
              
                <input
                  className="bg-gray-200  border-2 border-gray-200 rounded w-full ml-5 py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="password"
                  placeholder="******************"
                  onChange={(e) => setNewpassword(e.target.value)}
                ></input>
             
              </div>

              <p className="pt-2 pl-5 text-lg text-left  text-slate-300">
                ENTER CONFIRM NEW PASSWORD
              </p>
              <div className="md:w-[50%] relative mt-2 mb-5 ">
              
                <input
                  className="bg-gray-200  border-2 border-gray-200 rounded w-full ml-5 py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="password"
                  placeholder="******************"
                  onChange={confirmPassword_onChange}

                ></input>
                            {error_password && (
                  <p className="text-red-500 absolute top-11 left-7">
                    {error_password}
                  </p>
                )}
             
              </div>

              <button className="flex mt-8 ml-5 p-2 text-lg text-left border-white border-2  rounded-lg hover:bg-purple-600 "   type="submit">
                SAVE
              </button>
              </form>

              <Link href="/user/account/information/"><button className="flex mt-5 ml-5 p-2 text-lg text-left border-white border-2  rounded-lg hover:bg-purple-600 " >
                BACK              </button> </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
