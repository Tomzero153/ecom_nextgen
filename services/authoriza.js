const jwt = require("jsonwebtoken");
// import Cookies from 'js-cookie';


export const authenticate=(response,next)=>{

    console.log(response.token);
    if(window !=="undefined"){
        sessionStorage.setItem("token",JSON.stringify(response.token))
        sessionStorage.setItem("user",JSON.stringify(response.username))
        sessionStorage.setItem("role",JSON.stringify(response.role))
        // Cookies.set("token", response.token, { expires: 1 }); // Token expires in 1 day
        // Cookies.set("user", response.username, { expires: 1 });
        // Cookies.set("role", response.role, { expires: 1 });
    }
    next()
}


export const checkadmin=  () => {
    console.log("test");
    if (typeof window !== "undefined") {
        if (sessionStorage.getItem("role")) {
            const role = JSON.parse(sessionStorage.getItem("role"))

            if(role =="admin")
            {
                return true;
            }
            else
            {
                return false;
            }


      
        } else {
            return false;
        }
    }
}

export const getUser = () => {
    if (typeof window !== "undefined" && window.sessionStorage) {
        if (sessionStorage.getItem("user")) {
            return JSON.parse(sessionStorage.getItem("user"));
        } else {
            return null;
        }
    } else {
        // Handle case where window or sessionStorage is not available
        return null;
    }
};

export const logout=(next)=>{
    if(window !=="undefined"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("role")
        // Cookies.remove("token");
        // Cookies.remove("user");
        // Cookies.remove("role");
        // window.location.reload();
    }
    
}


