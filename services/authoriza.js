const jwt = require("jsonwebtoken");


export const authenticate=(response,next)=>{

    console.log(response.token);
    if(window !=="undefined"){
        sessionStorage.setItem("token",JSON.stringify(response.token))
        sessionStorage.setItem("user",JSON.stringify(response.username))
        sessionStorage.setItem("role",JSON.stringify(response.role))
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
        // window.location.reload();
    }
    
}


