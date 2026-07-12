import axios from "axios";
import api from "./api";

const API_BASE_URL = "/api/auth";

export const loginAdmin=async(username,password)=>{

    const response=await api.post(`${API_BASE_URL}/login`,{
        username,
        password
    });

    return response.data;
};

// Register User

export const registerUser = async (user) => {

    const response = await api.post(
        "/api/auth/register",
        user
    );

    return response.data;
};