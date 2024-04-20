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




    useEffect(() => {
      fetchData()
    }, [effect,checkUser]);


    const fetchData = async () => {
      console.log("userfetch,",checkUser);
      if(checkUser != "" && checkUser != false )
      {
        console.log("user >>>>>",checkUser);
      try {
        const res = await fetch("/api/user/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ checkUser })
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
  

    const contextValue = {user,setUser,user_detail,setUser_detail ,checkUser,setCheckUser,adminrole,setAdminrole,effect,setEffect};
    return(
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    )
  }


  export function useUserContext()
{
    return useContext(UserContext);
}


  