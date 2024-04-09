"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Item from "../item";

export default function Bestseller() {
  const [bestseller, setBestseller] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch("/api/product/getallproduct", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("ไม่สามารถดึงข้อมูลได้");
      }
      const data = await res.json();
      // sort best seller
      data.sort((a, b) => b.sellqty - a.sellqty);
      // console.log(data);
      setBestseller(data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาด: ", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="block mt-5 xl:w-[1300px] w-full xl:m-auto  ">
      <div class=" text-purple-700 pt-4 flex items-center">
        <button class="lg:text-3xl text-2xl  p-1 border-2 border-purple-700 bg-transparent">
          BEST SELLERS
        </button>
        <div class="flex-grow h-px bg-purple-700 ml-2"></div>
      </div>

      <div className="ml-3 grid xl:grid-cols-4  lg:gap-4   md:grid-cols-3 grid-cols-2 gap-2  pt-4 ">
        
        {bestseller.length >0  &&   bestseller.slice(0, 8).map((item, index) => {
          return (
            <Item
              key={index}
              itemId={item.id}
              slug={item.slug}
              title={item.title}
              image={item.img1}
              price={item.price}
              discount={item.discount}
            />
          );
        })}
      </div>
    </div>
  );
}
