"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppContext } from "@/context";
import { useRouter } from 'next/navigation'

export default function Search() {
  const { setSearching } = useAppContext();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter()

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearching(searchValue);
    router.push('/main/catalog/search');
    // ทำสิ่งที่คุณต้องการด้วยค่า searchValue
    console.log("ค่าที่ค้นหา: ", searchValue);
  };

  const handleIconClick = () => {
    setSearching(searchValue);
    router.push('/main/catalog/search');
    // ทำสิ่งที่คุณต้องการด้วยค่า searchValue
    console.log("ค่าที่ค้นหา: ", searchValue);
  };

  return (
    <>
  <form onSubmit={handleSearchSubmit} className="flex flex-grow">
        <input
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
            className="relative m-0 block flex-grow rounded-full border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-1.5 text-xl font-normal text-surface transition duration-300 ease-in-out focus:border-primary focus:text-white focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-purple-600 dark:bg-body-dark text-purple-600 dark:placeholder:text-purple-800 dark:autofill:shadow-autofill"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
        />
        <button type="submit" className="sr-only">Search</button>
    </form>

    <span
                className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-xl font-normal  text-purple-600 [&>svg]:w-5"
                id="basic-addon2"
                onClick={handleIconClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clipRule="evenodd"
                    />
                </svg>
            </span>
    </>
  );
}
