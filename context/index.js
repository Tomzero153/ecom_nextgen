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

  const [currency, setCurrency] = useState({ type: "$", value: 1 });
  const [searching,setSearching] = useState("");
  const [isPageRefreshed, setIsPageRefreshed] = useState(true); 





  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    // localStorage.setItem('cartItems', JSON.stringify(cartItems));

  };
  


  const ChangqtyToCart = (vale,itemId) => {
    if(vale >0)
    {
    setCartItems((prev) => ({ ...prev, [itemId]: Number(vale) }));
    // localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

  };

  const read_cart =()=>
  {
    if(localStorage.getItem("cartItems"))
    {

      const x = JSON.parse(localStorage.getItem("cartItems"))
      setCartItems(x);
    }
 


  }

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
    if(all_product.length > 0)
    {
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
  }
  

    return totalAmount;
  }

  useEffect(() => {

    if (!isPageRefreshed) { // ตรวจสอบว่าไม่มีการรีเฟรชหน้า
      console.log( "resetx");
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      fetch_update_cart();
    } else {
      setIsPageRefreshed(false); // ตั้งค่าให้เป็น false เมื่อมีการเรียกใช้งานเมื่อมีการรีเฟรชหน้า
    }
   
  }, [cartItems, isPageRefreshed]);




  useEffect(() => {
    setIsPageRefreshed(true); // ตั้งค่าให้เป็น true เมื่อมีการรีเฟรชหน้า
  }, []);

  const fetch_update_cart = async () => {
    if(getUser())
    {
      const username = getUser();
      console.log("username",username)
      console.log("to cart",cartItems)
    try {
      const res = await fetch("/api/user/updatecart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username , cartItems })
      });
      if (!res.ok) {
        throw new Error("ไม่สามารถดึงข้อมูลได้");
      }
      const data = await res.json();
      console.log("data",data);
     if(data== true)
     {
      return;
    }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด: ", error.message);
    }
  }
  };

  useEffect(() => {
    console.log( "reset2");
    fetchData();
    read_cart();
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









  

  const contextValue = {state,all_product,cartItems,addToCart,getTotalcartItems,getTotalCartAmount,removeFromCart,ChangqtyToCart,setCartItems,setCurrency,currency
  ,searching,setSearching};
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