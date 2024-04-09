"use client";

import { createContext, useContext, useState,useEffect } from "react";
import { getUser } from "../services/authoriza";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};




export function ContextWrapper({ children }) {
  let [state, setState] = useState({
    hello: "worldx"
  });
  const [all_product,setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const [checkUser, setCheckUser] = useState(getUser());

  const [adminrole, setAdminrole] = useState(false);




  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

  };


  const ChangqtyToCart = (vale,itemId) => {
    if(vale >0)
    {
    setCartItems((prev) => ({ ...prev, [itemId]: Number(vale) }));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

  };

  const getTotalcartItems = ()=>{
    let totalItem = 0;
    for(const item in cartItems)
    {
        if(cartItems[item]>0)
        {
            totalItem += cartItems[item];
        }
    }
    return totalItem;
  }


  const removeFromCart = (itemId) => {

    setCartItems((prev) => ({ ...prev, [itemId]: 0}));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

  };
  const getTotalCartAmount = () => 
  {
    let totalAmount = 0;
    for(const item in cartItems)
    {
      if(cartItems[item]>0)
      {
        let itemInfo = all_product.find((product)=>product.id===Number(item))
        const newprice = itemInfo.price - itemInfo.price * (itemInfo.discount / 100);
        console.log("newprice",newprice);
        totalAmount += newprice*cartItems[item];
      }  
    }

    return totalAmount;
  }


  useEffect(() => {
    console.log( "reset2");
    fetchData();
  }, []);
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
      setAll_product(data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาด: ", error.message);
    }
  };

  const contextValue = {state,all_product,cartItems,addToCart,getTotalcartItems,getTotalCartAmount,removeFromCart,ChangqtyToCart,setCartItems,checkUser,setCheckUser,adminrole,setAdminrole};
  return(
  <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  )
}



export function useAppContext()
{
    return useContext(ShopContext);
}


async function getallproduct()
{
 
}