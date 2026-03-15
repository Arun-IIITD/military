import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {register} from "../services/api";
import "./Register.css";

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

    // Validation: base is required for admin and commander
    if ((form.role === "ADMIN" || form.role === "BASE_COMMANDER") && !form.base) {
      alert("Base is required for ADMIN or BASE_COMMANDER roles");
      return;
    }

     // For LOGISTICS_OFFICER send base = null
    // if (form.role === "LOGISTICS_OFFICER") {
    //   form.base = null;
    // }

    const sendData = {
      ...form,
      base: form.role === "LOGISTICS_OFFICER" ? null : form.base
    };



    try {
      await register(sendData);
      alert("User registered successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
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

        {/* Base field only for ADMIN and BASE_COMMANDER */}
        {(form.role === "ADMIN" || form.role === "BASE_COMMANDER") && (

          <select
          name="base"
          value={form.base}
          onChange={handleChange}
          className="role-select"
        >
          <option value="">Select base</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderaba</option>
        </select>


        )}

        <button type="submit">Register</button>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>


      </form>
    </div>
  );
}