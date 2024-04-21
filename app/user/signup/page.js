// `app/page.js` is the UI for the `/` URL

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/user";

export default function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error_email, setError_email] = useState("");
  const [password, setPassword] = useState("");
  const [error_password, setError_password] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const { user,setUser } = useUserContext();


  const handleSubmit = async (e) => {
    e.preventDefault();

    //check password
    if (password != confirmPassword) {
      Swal.fire("Oops...", "Password do not match!", "error");
      return;
    }

    if (!username || !password || !confirmPassword) {
      Swal.fire("Oops...", "Please complete all inputs.", "error");
      return;
    }

    //user check
    const resCheckUser = await fetch("/api/user/usercheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const { user } = await resCheckUser.json();
    console.log(user);
    if (user) {
      Swal.fire("Oops...", "User already exists.", "error");
      return;
    }

    //register
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        Swal.fire("OK", "User registration successfully!", "success");
        form.reset();
        setUser(username);
        
        router.push("/user/address");
      } else {
        Swal.fire("Oops...", "User registration failed.", "error");
        console.log("User registration failed.");
      }
    } catch (error) {
      Swal.fire("Oops...", "Error during registration:", "error");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  const email_onChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (validateEmail(emailValue)) {
      setError_email("");

    } else {
      setError_email("Email worng formate");
      // ใส่โค้ดสำหรับแสดงข้อความหรือการแจ้งเตือนถ้าอีเมลไม่ถูกต้อง
    }
  };


  const confirmPassword_onChange = (e) => {
    const passwordValue = e.target.value;
    setConfirmPassword(passwordValue);

    if (passwordValue == password  &&  passwordValue.length > 1) {
      setError_password("");
      
    } else {
      setError_password("Password not match");
      // ใส่โค้ดสำหรับแสดงข้อความหรือการแจ้งเตือนถ้าอีเมลไม่ถูกต้อง
    }
  };

  return (
    <div className="">
      <div className=" block xl:w-[1300px] w-full m-auto  items-center pt-20">
        <div className="sm:w-[600px] w-full m-auto items-center  bg-purple-950  rounded-md">
          <h1 className="pt-5 flex text-4xl justify-center">SIGN UP</h1>
          <form onSubmit={handleSubmit} className="pl-2  pt-8  w-full max-w-sm">
            <div className="md:flex md:items-center mb-8">
              <div className="md:w-1/3">
                <label
                  className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Email
                </label>
              </div>
              <div className="md:w-2/3 relative">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none  focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={email_onChange}
                />
                {error_email && (
                  <p className="text-red-500 absolute top-10 left-0">
                    {error_email}
                  </p>
                )}
              </div>
            </div>

            <div className="md:flex md:items-center mb-8">
              <div className="md:w-1/3">
                <label
                  className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  User Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-8">
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

            <div className="md:flex md:items-center mb-8">
              <div className="md:w-1/3">
                <label
                  className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-password"
                >
                  Confirm Password
                </label>
              </div>
              <div className="md:w-2/3 relative">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="password"
                  placeholder="******************"
                  onChange={confirmPassword_onChange}
                />
                     {error_password && (
                  <p className="text-red-500 absolute top-10 left-0">
                    {error_password}
                  </p>
                )}
              </div>
            </div>
            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/3"></div>
              <label className="md:w-2/3 block  text-white font-bold">
                <p className="text-sm">
                  You have an account?
                  <Link href="/user/login" className="text-lg text underline">
                    {" "}
                    Log in
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
                  SIGN UP
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
