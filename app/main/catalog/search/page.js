/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Item from "../../../../Components/item";
import { useAppContext } from "@/context";

export default function Searchpage() {
  const {  all_product, searching } = useAppContext();
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  function findsearch() {
    const all_productsort = all_product.sort((a, b) => b.sellqty - a.sellqty);
if(searching.length >= 1)
{
    setProduct(
      all_productsort.filter((e) => e.title.toLowerCase().includes(searching))
    );
}
  }

  const sortby = (selectedValue) => {
    if (product.length > 0) {
      let sortedProduct = [...product]; // สร้างอ็อบเจ็กต์ใหม่โดยคัดลอกข้อมูลจากอ็อบเจ็กต์ product
      if (selectedValue === "LH") {
        sortedProduct.sort((a, b) => {
          const discountedPriceA = a.price - a.price * (a.discount / 100);
          const discountedPriceB = b.price - b.price * (b.discount / 100);
          return discountedPriceA - discountedPriceB;
        });
      } else if (selectedValue === "HL") {
        sortedProduct.sort((a, b) => {
          const discountedPriceA = a.price - a.price * (a.discount / 100);
          const discountedPriceB = b.price - b.price * (b.discount / 100);
          return discountedPriceB - discountedPriceA;
        });
      } else if (selectedValue === "BS") {
        sortedProduct.sort((a, b) => b.sellqty - a.sellqty);
      }
      setProduct(sortedProduct); // อัปเดตสถานะของสินค้าเป็นอ็อบเจ็กต์ที่ถูกเรียงลำดับแล้ว
    }
  };
  const calculateTotalPages = () => {
    const totalPages = Math.ceil(product.length / itemsPerPage);
    return totalPages;
  };

  const getPageItems = (product, pageNumber) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = pageNumber * itemsPerPage;
    return product.slice(startIndex, endIndex);
  };

  const onPageChange = (Number) => {
    setCurrentPage(Number);
  };
  const totalPages = calculateTotalPages();
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  useEffect(() => {
    findsearch();
  }, [searching]);

  return (
    <div className="block mt-2 xl:w-[1300px] w-full m-auto  items- ">
      <div className=" text-purple-700 pt-4 flex items-center"></div>

      <div className="flex justify-end   ">
        <form className="flex w-60">
          <label className="flex  md:w-16 w-12 items-center  text-sm  font-medium text-gray-900 dark:text-white">
            Sort by
          </label>
          <select
            onChange={(e) => sortby(e.target.value)}
            id="countries"
            className="w-40  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="LH">Price low to hight</option>
            <option value="HL">Price hight to low</option>
            <option selected value="BS">
              Best Sale
            </option>
            {/* <option value="DE">Germany</option> */}
          </select>
        </form>
      </div>

      <p className="text-3xl">{searching}</p>

      {product.length > 0 ? (
        <div className="ml-3 grid xl:grid-cols-4 lg:gap-4 md:grid-cols-3 grid-cols-2 gap-2 pt-4">
          {getPageItems(product, currentPage).map((item, index) => {
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
      ) : (
        <p className="text-xl pt-2">Not found</p>
      )}

      <nav className="flex  pt-5 justify-end">
        <ul className="flex border border-gray-300 rounded ">
          {pageNumbers.map((pageNumber) => (
            <li
              key={pageNumber}
              className={`cursor-pointer ${
                currentPage === pageNumber
                  ? " bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } md:px-4 md:py-2  px-3 py-1 hover:bg-purple-300`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
