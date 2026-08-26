// ==========================================
// Token
// ==========================================

export const getToken = () => {

    return localStorage.getItem("token");

};


// ==========================================
// Username
// ==========================================

export const getUsername = () => {

    return localStorage.getItem("username");

};


// ==========================================
// Role
// ==========================================

export const getRole = () => {

    return localStorage.getItem("role");

};


// ==========================================
// Check Token Expiration
// ==========================================

export const isTokenValid = () => {

    const token = getToken();

    if (!token) {
        return false;
    }

    try {

        const payload =
            JSON.parse(
                atob(token.split(".")[1])
            );

        const expiration =
            payload.exp * 1000;

        return expiration > Date.now();

    } catch (error) {

        console.error(
            "Invalid JWT token:",
            error
        );

        return false;

    }

};


// ==========================================
// Logged In
// ==========================================

export const isLoggedIn = () => {

    const token = getToken();

    if (!token) {
        return false;
    }

    if (!isTokenValid()) {

        logout();

        return false;
    }

    return true;

};


// ==========================================
// Is Admin
// ==========================================

export const isAdmin = () => {

    return isLoggedIn()
        && getRole() === "ROLE_ADMIN";

};


// ==========================================
// Is Editor
// ==========================================

export const isEditor = () => {

    return isLoggedIn()
        && getRole() === "ROLE_EDITOR";

};


// ==========================================
// Is User
// ==========================================

export const isUser = () => {

    return isLoggedIn()
        && getRole() === "ROLE_USER";

};


// ==========================================
// Logout
// ==========================================

export const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("username");

    localStorage.removeItem("role");

};