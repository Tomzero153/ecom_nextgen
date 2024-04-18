"use client";

import { createContext, useContext, useState,useEffect } from "react";

export const UserContext = createContext(null);

export function UserContextWrapper({ children }) {

    const [user,setUser] = useState("");

  

  
    useEffect(() => {
    
    }, []);

    const contextValue = {user,setUser};
    return(
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    )
  }


  export function useUserContext()
{
    return useContext(UserContext);
}


  