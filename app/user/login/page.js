/* eslint-disable react/no-unescaped-entities */
// `app/page.js` is the UI for the `/` URL

"use client";


import React, { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation'
import { useAppContext } from "@/context";


import { authenticate,checkadmin,getUser  } from "../../../services/authoriza";

export default function Login() {

  const { setCheckUser, setAdminrole } = useAppContext();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  async function checklogin() {
    try {
      const res = await fetch("/api/user/logincheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
       ;
      }
      console.log(data.passwordMatch);
      if (data.passwordMatch) {
        console.log("token",data.token);
        console.log("username",data.username);
        authenticate(data, () => { 
        });
         rolecheck();

        return;
      }
    } catch (error) {
      Swal.fire("Oops...", error.message, "error");
    }
  }

  async function rolecheck() {
    try {

      setCheckUser(getUser);
      const role = checkadmin()
      if (role == true) {
        setAdminrole(true)
        router.push('/admin/addProduct');
    
        return;
      }
      else{
        router.push('/');
      
        return;
      }
    } catch (error) {
      Swal.fire("Oops...", error.message, "error");
    }
  }






  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire("Oops...", "Please complete all inputs.", "error");
      return;
    }

    checklogin();


  };


  //  useEffect(()=>{
  //   console.log("useeffext");
  //   },[])

  return (
    <div className="">
      <div className=" block xl:w-[1300px] w-full m-auto  items-center pt-20">
        <div className="sm:w-[600px] w-full m-auto items-center  bg-purple-950  rounded-md">
          <h1 className="pt-5 flex text-4xl justify-center">LOG IN</h1>
          <form onSubmit={handleSubmit} className="pl-2  pt-8  w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Full Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-password"
                >
                  Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="password"
                  placeholder="******************"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/3"></div>
              <label className="md:w-2/3 block  text-white font-bold">
                <p className="text-sm">
                  Don't have an account?
                  <Link href="/user/signup" className="text-lg text underline">
                    {" "}
                    Sign up
                  </Link>
                </p>
              </label>
            </div>
            <div className="pb-5 md:flex md:items-center">
              <div className="md:w-1/3"></div>

              <div className="md:w-2/3">
                <button
                  className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  LOGIN
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
