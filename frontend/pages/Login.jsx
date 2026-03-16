import { useState } from "react";
import {login} from "../services/api"
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await login(form);

    // check if token exists
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("name", res.user.name);
      localStorage.setItem("role", res.user.role);
      localStorage.setItem("base",res.user.base)
      alert("Login successful");
      navigate("/dashboard");
      window.location.reload();
    } else {
      alert(res.message || "Invalid email or password");
    }

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="login-container">
     


      <form className="login-form" onSubmit={handleLogin}>

        <h2>Military Login System</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">
          Login
        </button>

        <p className="register-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </p>

      </form>

    </div>
  );
};

export default Login;