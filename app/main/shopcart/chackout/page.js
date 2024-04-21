// `app/page.js` is the UI for the `/` URL
"use client";
import Image from "next/image";
import { useAppContext } from "@/context";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { useUserContext } from "@/context/user";
import AddressPopup  from "../../../../Components/AddressPopup "

export default function Checkout() {
  const {
    all_product,
    cartItems,
    removeFromCart,
    ChangqtyToCart,
    getTotalCartAmount,currency,setCartItems
  } = useAppContext();
  const { user, setUser,user_detail,setUser_detail,address_detail,setAddress_detail } = useUserContext();
  const [qtyItems, setQtyItems] = useState(5);

  const new_price = (item) => {
    const price = item.price - item.price * (item.discount / 100);
    console.log(price);
    return price;
  };

  
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };



  const DefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
      cart[index] = 0;
    }
    return cart;
  };

  const buysuccess=  async() =>
  {
   
    const address = address_detail;
    const username = user_detail.username;
    const cartData = cartItems;
    const totalAmount =  getTotalCartAmount();

    if (
      !address ||
      !username ||
      !cartData ||
      !totalAmount 
    ) {
      Swal.fire("Oops...", "Please complete all inputs.", "error");
      return;
    }

    try {
      const res = await fetch("/api/order/addorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({
            username,
            address,
            cartData,
            totalAmount,
      }),
    });


      if (res.ok) {

        setCartItems(DefaultCart());
        Swal.fire("OK", "Add Product successfully!", "success");
       
      } else {
        Swal.fire("Oops...", "Add Product failed.", "error");
        console.log("Add Product failed.");
      }
    } catch (error) {
      Swal.fire("Oops...", "Error during Add Product", "error");
    }

    return;

    if(getTotalCartAmount() > 0)
    {

    Swal.fire("OK", "Buy Complete", "success");
    
    }
    else
    {
      Swal.fire("Error", "Please add product in the cart", "error");
    }

  }



  return (
    <div className=" block xl:w-[1300px] w-full  xl:m-auto  items-center pt-8">
      <p className=" text-3xl pb-5 font-bold">Checkout</p>

      <div className="mt-5 ">
      <div className="h-10 bg-purple-600 rounded">
          <p className="ml-5 text-left md:text-2xl text-xl  mr-5">Address</p>
        </div>

      <div className="bg-gray-800 border-gray-700 mb-5">
             {address_detail && (
              <>
              <div className="flex ml-10"  >
              <div className="w-[20%]">
              <p className="pt-4 pl-5 text-lg text-left  text-white">{address_detail.name}</p>
              <p className="pt-1 pl-5 text-lg text-left  text-white"> {address_detail.phone}</p>
              </div>

              <div className=" w-[60%]">
              <p className="pt-4 pl-5 text-lg text-left  text-white">{address_detail.address} {address_detail.city} {address_detail.state}</p>
            <p className="pt-1 pl-5 text-lg text-left  text-white">{address_detail.country} {address_detail.postal}</p>

              </div>

              <div className=" w-[20%]">

              <button className="flex mt-5 ml-5 mb-4 p-2 text-lg text-left border-white border-2  rounded-lg hover:bg-purple-600" onClick={() => setIsPopupOpen(true)}>EDIT ADDRESS</button>
              </div>
            </div>

</>
             )} 
             {isPopupOpen && <AddressPopup onClose={handleClosePopup} />}
             
           
      </div>
 
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                      <Image
                        src={e.img1}
                        class="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                        width={500}
                        height={500}
                      />
                    </td>
                    <td className="md:px-6 px-1  py-4  md:text-sm text-xs font-semibold text-gray-900 dark:text-white">
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
                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="1"
                            required
                          />
                        </div>
                      </div>
                    </td>
                    <td className="md:px-6 px-1  md:text-sm text-xs py-4 font-semibold text-gray-900 dark:text-white">
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
          <p className=" md:text-2xl text-xl  mr-5">total amount</p>
        </div>
        <div className="h-14 flex border-b justify-end items-center bg-gray-800 border-gray-700 ">
          <p className=" md:text-xl text-sm  mr-5">{currency.type}{(getTotalCartAmount()*currency.value).toLocaleString()}</p>
        </div>
        <div className=" h-16 flex justify-end items-center border-b bg-gray-800 border-gray-700  ">
         
          <button className="md:p-2 p-1 md:text-2xl text-xl    mr-5 bg-purple-600 rounded-md"
         onClick={()=>buysuccess()}>
            Buy Now
          </button>
          
        </div>
          
        </div>
   
      </div>
      {isPopupOpen && <AddressPopup onClose={handleClosePopup} />}

    </div>

  );
}
