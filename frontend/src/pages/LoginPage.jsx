import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const res = await API.post("/api/auth/login", form);
    login(res.data)
    if(res.data.success){
      navigate("/");
    }
    }catch (err){
      console.error("login failed:",err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input type="text" placeholder="Username" className="login-input" onChange={e => setForm({ ...form, username: e.target.value })} />

      <input type="password" placeholder="Password"   className="login-input" onChange={e => setForm({ ...form, password: e.target.value })} />

      <button type="button" className="login-btn" 
      onClick={() => navigate("/")}
      >Login</button>
    </form>
  );
}