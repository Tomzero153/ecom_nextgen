// `app/page.js` is the UI for the `/` URL

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/user";

export default function Signup() {
  const { user, setUser } = useUserContext();

  const [input_name, setInput_name] = useState("");
  const [input_address, setInput_address] = useState("");
  const [input_city, setInput_city] = useState("");
  const [input_state, setInput_state] = useState("");
  const [input_postal, setInput_Postal] = useState();
  const [input_country, setInput_Country] = useState("");
  const [input_phone, setInput_Phone] = useState();
  const [error_name, setError_name] = useState("");
  const [error_address, setError_address] = useState("");
  const [error_city, setError_city] = useState("");
  const [error_state, setError_state] = useState("");
  const [error_postal, setError_Postal] = useState("");
  const [error_country, setError_Country] = useState();
  const [error_phone, setError_Phone] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const onChange_input_name = (e) => {
    const Value = e.target.value;
    setInput_name(Value);


    if (Value.length >= 1) {
      setError_name("");
    } else {
      setError_name("name worng formate");
      // ใส่โค้ดสำหรับแสดงข้อความหรือการแจ้งเตือนถ้าอีเมลไม่ถูกต้อง
    }
  };

  const onChange_input_address = (e) => {
    const Value = e.target.value;
    setInput_address(Value);

    if (Value.length >= 1) {
      setError_address("");
    } else {
      setError_address("name worng formate");
      // ใส่โค้ดสำหรับแสดงข้อความหรือการแจ้งเตือนถ้าอีเมลไม่ถูกต้อง
    }
  };

  const onChange_input_state = (e) => {
    const Value = e.target.value;
    setInput_state(Value);

    if (Value.length >= 1) {
      setError_state("");
    } else {
      setError_state("name worng formate");
      // ใส่โค้ดสำหรับแสดงข้อความหรือการแจ้งเตือนถ้าอีเมลไม่ถูกต้อง
    }
  };

  const onChange_input_city = (e) => {
    const Value = e.target.value;
    setInput_city(Value);

    if (Value.length >= 1) {
      setError_city("");
    } else {
      setError_city("name worng formate");
      // ใส่โค้ดสำหรับแสดงข้อความหรือการแจ้งเตือนถ้าอีเมลไม่ถูกต้อง
    }
  };

  const onChange_input_postal = (e) => {
    const Value = e.target.value;
    setInput_Postal(Value);

    if (Value.length >= 1) {
      setError_Postal("");
    } else {
      setError_Postal("name worng formate");
      // ใส่โค้ดสำหรับแสดงข้อความหรือการแจ้งเตือนถ้าอีเมลไม่ถูกต้อง
    }
  };

  const onChange_input_phone = (e) => {
    const Value = e.target.value;
    setInput_Phone(Value);

    if (Value.length >= 1) {
      setError_Phone("");
    } else {
      setError_Phone("phone worng formate");
      // ใส่โค้ดสำหรับแสดงข้อความหรือการแจ้งเตือนถ้าอีเมลไม่ถูกต้อง
    }
  };

  const onChange_input_country = (e) => {
    const Value = e.target.value;
    setInput_Country(Value);

    if (Value.length >= 1) {
      setError_Country("");
    } else {
      setError_Country("phone worng formate");
      // ใส่โค้ดสำหรับแสดงข้อความหรือการแจ้งเตือนถ้าอีเมลไม่ถูกต้อง
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !user ||
      !input_name ||
      !input_address ||
      !input_city ||
      !input_state ||
      !input_postal ||
      !input_country ||
      !input_phone
    ) {
      Swal.fire("Oops...", "Please complete all inputs.", "error");
      return;
    }

    try {
      const res = await fetch("/api/address/addAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          input_name,
          input_address,
          input_city,
          input_postal,
          input_state,
          input_country,
          input_phone,
        }),
      });

      if (res.ok) {
        // const form = e.target;
        router.push("/user/login");
        // Swal.fire("OK", "Add Product successfully!", "success");
        // form.reset();
      } else {
        Swal.fire("Oops...", "Add Product failed.", "error");
        console.log("Add Product failed.");
      }
    } catch (error) {
      Swal.fire("Oops...", "Error during Add Product", "error");
    }
  };

  return (
    <div className="">
      <div className=" block xl:w-[1300px] w-full m-auto  items-center pt-20">
        <div className="sm:w-[600px] w-full m-auto items-center  bg-purple-950  rounded-md">
          <h1 className="pt-5 flex text-4xl justify-center">ADDRESS</h1>
          <form onSubmit={handleSubmit} className="pl-2  pt-8  w-full max-w-sm">
            <div className="md:flex md:items-center  mb-8">
              <div className="md:w-1/3">
                <label
                  className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  NAME
                </label>
              </div>
              <div className="md:w-2/3 relative">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  placeholder="Username"
                  value={input_name}
                  onChange={onChange_input_name}
                />
                {error_name && (
                  <p className="text-red-500 absolute top-10 left-0">
                    {error_name}
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
                  ADDRESS
                </label>
              </div>
              <div className="md:w-2/3 relative">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  placeholder="ADDRESS"
                  value={input_address}
                  onChange={onChange_input_address}
                />
                {error_address && (
                  <p className="text-red-500 absolute top-10 left-0">
                    {error_address}
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
                  CITY
                </label>
              </div>
              <div className="md:w-2/3 relative">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  placeholder="city"
                  value={input_city}
                  onChange={onChange_input_city}
                />
                {error_city && (
                  <p className="text-red-500 absolute top-10 left-0">
                    {error_city}
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
                  STATE/PROVINCE
                </label>
              </div>
              <div className="md:w-2/3 relative">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  placeholder="state"
                  value={input_state}
                  onChange={onChange_input_state}
                />
                {error_state && (
                  <p className="text-red-500 absolute top-10 left-0">
                    {error_state}
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
                  ZIP/POSTAL CODE
                </label>
              </div>
              <div className="md:w-2/3 relative">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="number"
                  placeholder="POSTAL CODE"
                  value={input_postal}
                  onChange={onChange_input_postal}
                />
                {error_postal && (
                  <p className="text-red-500 absolute top-10 left-0">
                    {error_postal}
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
                  COUNTRY
                </label>
              </div>
              <div className="md:w-2/3 relative">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  placeholder="country"
                  value={input_country}
                  onChange={onChange_input_country}
                />
                {error_country && (
                  <p className="text-red-500 absolute top-10 left-0">
                    {error_country}
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
                  PHONE NUMBER
                </label>
              </div>
              <div className="md:w-2/3 relative">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="tel"
                  placeholder="Phone"
                  value={Phone}
                 
                  onChange={onChange_input_phone}
                />
                {error_phone && (
                  <p className="text-red-500 absolute top-10 left-0">
                    {error_phone}
                  </p>
                )}
              </div>
            </div>

            <div className="pb-5 md:flex md:items-center">
              <div className="md:w-1/3"></div>

              <div className="md:w-2/3 relative">
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
