// `app/page.js` is the UI for the `/` URL
"use client";
import Image from "next/image";
import { useAppContext } from "@/context";
import { useUserContext } from "@/context/user";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function ShopCart() {
  const {
    all_product,
    cartItems,
    removeFromCart,
    ChangqtyToCart,
    getTotalCartAmount,currency
  } = useAppContext();

  const { checkUser } = useUserContext();
  const router = useRouter();
  const [qtyItems, setQtyItems] = useState(5);


  const new_price = (item) => {
    const price = item.price - item.price * (item.discount / 100);
    console.log(price);
    return price;
  };

  const buysuccess=  () =>
  {

    if(checkUser)
    {
      router.push("/main/shopcart/chackout");
    }
    else
    {
      Swal.fire("Error", "Please Login", "error");
      router.push("/user/login");
    }
 

  }


  return (
    <div className=" block xl:w-[1300px] w-full  xl:m-auto  items-center pt-8">
      <p className=" text-3xl pb-5 font-bold">CART</p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
          <thead className="md:text-sm  text-xs  text-white uppercase bg-purple-600 ">
            <tr>
              <th scope="col" className="md:px-16  px-1 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="md:px-6 px-1 py-3">
                Product
              </th>
              <th scope="col" className="md:px-6 px-1 py-3">
                Qty
              </th>
              <th scope="col" className="md:px-6 px-1 py-3">
                Total Price
              </th>
              <th scope="col" className="md:px-6 px-1 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {all_product.map((e) => {
              if (cartItems[e.id] > 0) {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <tr className=" border-b bg-gray-800 border-gray-700  hover:bg-gray-600">
                    <td className="p-4">
                      <Image
                        src={e.img1}
                        class="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                        width={500}
                        height={500}
                      />
                    </td>
                    <td className="md:px-6 px-1  py-4  md:text-sm text-xs font-semibold  text-white">
                      <p> {e.title.toUpperCase()}</p>
                      <p className="pt-5">Price: {currency.type}{(new_price(e)*currency.value).toLocaleString()}</p>
                    </td>

                    <td className="md:px-6 px-1  md:text-sm text-xs py-4">
                      <div className="flex items-center">
                        <div>
                          <input
                            type="number"
                            value={cartItems[e.id]}
                            onChange={(valuex) =>
                              ChangqtyToCart(valuex.target.value, e.id)
                            }
                            id="first_product"
                            className="w-14 border text-sm rounded-lg  block px-2.5 py-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="1"
                            required
                          />
                        </div>
                      </div>
                    </td>
                    <td className="md:px-6 px-1  md:text-sm text-xs py-4 font-semibold  text-white">
                    {currency.type}{((new_price(e) *cartItems[e.id])*currency.value).toLocaleString()}
                    </td>
                    <td className="md:px-6 px-1  md:text-sm text-xs py-4">
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() =>
                          removeFromCart(e.id)
                        }
                      
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                );
              }
              return null;
            })}
      
          </tbody>
        </table>
        <div className=" ">
        <div className="h-10 mt-12 flex justify-end items-center bg-purple-600 rounded">
          <p className=" md:text-2xl text-xl  mr-5">Total cart</p>
        </div>
        <div className="h-14 flex border-b justify-end items-center bg-gray-800 border-gray-700 ">
          <p className=" md:text-xl text-sm  mr-5">{currency.type}{(getTotalCartAmount()*currency.value).toLocaleString()}</p>
        </div>
        <div className=" h-16 flex justify-end items-center border-b bg-gray-800 border-gray-700  ">
         
          <button className="md:p-2 p-1 md:text-2xl text-xl    mr-5 bg-purple-600 rounded-md" onClick={()=>buysuccess()}>
            Buy Now
          </button>
          
        </div>
          
        </div>
   
      </div>
    </div>
  );
}
