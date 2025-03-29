import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "http://localhost:7001/api" 
    : "https://chat-app-sr0r.onrender.com/api",
  withCredentials: true,
});
