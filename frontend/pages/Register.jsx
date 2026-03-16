import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {register} from "../services/api";
import "./register.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    base: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Only BASE_COMMANDER must have a base
  if (form.role === "BASE_COMMANDER" && !form.base) {
    alert("Base is required for BASE_COMMANDER");
    return;
  }

  const sendData = {
    ...form,
    base: form.role === "BASE_COMMANDER" ? form.base : null
  };

  try {
    const res = await register(sendData);

    if (!res || !res.token) {
      throw new Error(res?.message || "Registration failed");
    }

    alert("Registered successfully");
    console.log("Redirecting...");
    navigate("/login");
    window.location.reload();

  } catch (err) {
    const errorMessage =
      err?.response?.data?.message || err.message || "Registration failed";

    alert(errorMessage);
  }
};

  return (
    <div className="register-container">

      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Military Register System</h2>
        <input 
        type="text" 
        name="name" 
        placeholder="Name" 
        onChange={handleChange} />


        <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        onChange={handleChange} />

        <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        onChange={handleChange} />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="role-select"
        >
          <option value="">Select Role</option>
          <option value="ADMIN">ADMIN</option>
          <option value="BASE_COMMANDER">BASE_COMMANDER</option>
          <option value="LOGISTICS_OFFICER">LOGISTICS_OFFICER</option>
        </select>

     

          <select
          name="base"
          value={form.base}
          onChange={handleChange}
          className="role-select"
          disabled={form.role !== "BASE_COMMANDER"}
        >
          <option value="">Select base</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>


        

        <button type="submit">Register</button>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>


      </form>
    </div>
  );
}