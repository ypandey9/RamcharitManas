//Token
export const getToken=()=>{
    return localStorage.getItem("token");
};

//Usernmae

export const getUsername=()=>{
    return localStorage.getItem("username");
};

//role
export const getRole=()=>{
    return localStorage.getItem("role");
};

//logged in

export const isLoggedIn=()=>{
    return !!getToken();
};

//IsAdmin

export const isAdmin=()=>{
    return getRole()==="ROLE_ADMIN";
};

//editor

export const isEditor=()=>{
    return getRole()==="ROLE_EDITOR";
};

//user

export const isUser=()=>{
    return getRole()==="ROLE_USER";
};

//Logout
export const logout=()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
};
