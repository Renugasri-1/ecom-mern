import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:8000/api", 
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const signupUser = (formData) => API.post("/auth/signup", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);
export const getProfile = () => API.get("/user/profile");
export default API;