"use client";
import cart from "../Assets/shop-cart.png";
import user from "../Assets/user_p.png";
import logoNextgen from "../Assets/Logonextgen.jpg";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context";

import { logout} from "../../services/authoriza";
import  { useState, useEffect } from "react";

export default function Navbar() {

  const { getTotalcartItems,checkUser,setCheckUser,adminrole,setAdminrole } = useAppContext();

  const adminmode = true;

  function clicklogout()
  {
    setCheckUser(false);
    setAdminrole(false);
    logout();
  }

  useEffect(()=>{
    console.log("navbar");
    },[])

  // }, []);
  return (
    <div className="py-2 bg-slate-900 md:sticky top-0 z-40  border-b  border-slate-700">
      <div className=" block xl:w-[1300px] w-full xl:m-auto   items-center md:h-[80px] h-[120px]">
        <div className="flex w-full h-20 flex-wrap items-center  ">
          <div className="flex  w-[50%]  items-center">
            <Link href="/">
              <Image className="flex  md:h-20   md:w-24  h-16 w-16 " src={logoNextgen} alt="" />
            </Link>
            <span className="ml-2 text-3xl  text-purple-600 hidden md:inline">
              NextGenMarketplace
            </span>

            <span className="ml-2 text-2xl  text-purple-600  md:hidden ">
              NextGen
            </span>
          </div>

          {/* <div className="hidden md:inline  md:flex w-[25%]   ">
            <input
              type="search"
              className="relative m-0 block w-[1px] flex-auto rounded-full border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-1.5 text-xl font-normal text-surface transition duration-300 ease-in-out focus:border-primary focus:text-white focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-purple-600 dark:bg-body-dark text-purple-600 dark:placeholder:text-purple-800 dark:autofill:shadow-autofill"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
            />

            <span
              className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-xl font-normal  text-purple-600 [&>svg]:w-5"
              id="basic-addon2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div> */}

          {/* <div className="flex-col pt-2 md:w-[25%] w-[50%]  justify-end "> */}
          <div className="flex-col pt-2  w-[50%]  justify-end ">
            <div className="flex gap-3 justify-end relative">
              {adminrole && (
                <Link href="/admin/addProduct">
                  <Image className="md:h-full md:w-10  h-8 w-8" src={adminlogo} alt="" />
                </Link>
              )}

              <div className="relative">
                <Link href="/main/shopcart">
                  <Image className="md:h-full md:w-10  h-8 w-8" src={cart} alt="" />
                </Link>
                <div className="absolute  top-[-10px] right-[-10px] h-6 w-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                  {getTotalcartItems()}
                </div>
              </div>

              {!checkUser && (
                <Link href="/user/login">
                  <Image className="md:h-full md:w-10  h-8 w-8" src={user} alt="" />
                </Link>
              )}

              {checkUser && (
                <Link href="/">
                  <Image className="md:h-full md:w-10  h-8 w-8" src={iconlogout} alt="" 
                  
                  onClick={()=>clicklogout()}
                  
                  />
                </Link>
              )}
            </div>


          </div>

        </div>

        {/* <div className="flex w-full]  md:hidden ">
            <input
              type="search"
              className="relative m-0 block w-[1px] flex-auto rounded-full border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-1.5 text-xl font-normal text-surface transition duration-300 ease-in-out focus:border-primary focus:text-white focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-purple-600 dark:bg-body-dark text-purple-600 dark:placeholder:text-purple-800 dark:autofill:shadow-autofill"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
            />

            <span
              className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-xl font-normal  text-purple-600 [&>svg]:w-5"
              id="basic-addon2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div> */}
      </div>
    </div>
  );
}
