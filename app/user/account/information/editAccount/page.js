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
  const [error_email, setError_email] = useState("");
  const username = user_detail.username;
  console.log("asd", user_detail.username);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  const email_onChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (validateEmail(emailValue)) {
      setError_email("");
      console.log("email", "true");
    } else {
      setError_email("Email worng formate");

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire("Oops...", "Please complete all inputs.", "error");
      return;
    }

    checklogin();


  };


  async function checklogin() {
    try {
      const res = await fetch("/api/user/editemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email,password }),
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
                ENTER NEW EMAIL
              </p>
              <div className="md:w-[50%] relative mt-2 mb-5 ">
                <input
                  className="bg-gray-200  border-2 border-gray-200 rounded w-full ml-5 py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={email_onChange}
                ></input>
                {error_email && (
                  <p className="text-red-500 absolute top-12 left-5">
                    {error_email}
                  </p>
                )}
              </div>

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

              <button className="flex mt-5 ml-5 p-2 text-lg text-left border-white border-2  rounded-lg hover:bg-purple-600 "   type="submit">
                EDIT ACCOUNT
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
