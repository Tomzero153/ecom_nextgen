"use client";

import { createContext, useContext, useState,useEffect } from "react";
import { getUser } from "../services/authoriza";

export const UserContext = createContext(null);

export function UserContextWrapper({ children }) {

     const [user_detail,setUser_detail] = useState([]);
     const [user,setUser] = useState("");

     const [checkUser, setCheckUser] = useState(getUser());

     const [adminrole, setAdminrole] = useState(false);

     const [effect, setEffect] = useState(false);
     const [all_address,setAll_address] = useState([]);
     const [address_detail,setAddress_detail] = useState([]);
     const [order_list,setOrder_list] = useState([]);




    useEffect(() => {
      fetchData()
      fetch_address()
      fetch_order()
      
    }, [effect,checkUser]);


    useEffect(() => {
      console.log( "fetch address");
  
    }, [effect,checkUser]);

    
    const fetchData = async () => {
      console.log("userfetch,",checkUser);
      if(checkUser != "" && checkUser != false )
      {
        console.log("user >>>>>",checkUser);
      try {
        const username = checkUser;
        const res = await fetch("/api/user/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username })
        });
        if (!res.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลได้");
        }
        const data = await res.json();
        setUser_detail(data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาด: ", error.message);
      }
    }
    };


    const fetch_address = async () => {
      console.log("userfetch,",checkUser);
      if(checkUser != "" && checkUser != false )
      {
        console.log("address >>>>>",checkUser);
      try {
        const username = checkUser;
        const res = await fetch("/api/address/getAddress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username })
        });
        if (!res.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลได้");
        }
        const data = await res.json();
        console.log("address",data);
        setAddress_detail(data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาด: ", error.message);
      }
    }
    };


    const fetch_order = async () => {
      console.log("userfetch,",checkUser);
      if(checkUser != "" && checkUser != false )
      {
        console.log("order >>>>>",checkUser);
      try {
        const username = checkUser;
        const res = await fetch("/api/order/getorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username })
        });
        if (!res.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลได้");
        }
        const data = await res.json();
        console.log("order",data);
        setOrder_list(data);
        // setAddress_detail(data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาด: ", error.message);
      }
    }
    };
  

    const contextValue = {user,setUser,user_detail,setUser_detail ,checkUser,setCheckUser,adminrole,setAdminrole,effect,setEffect,address_detail,setAddress_detail,order_list,setOrder_list};
    return(
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    )
  }


  export function useUserContext()
{
    return useContext(UserContext);
}


  