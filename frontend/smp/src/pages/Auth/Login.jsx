import { useState } from "react";
import { useContext }from "react"
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken } = useContext(AuthContext);
  const  navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/users/login", {
      email,
      password,
    });

    const { token, user } = res.data;

    // 1. Save to localStorage (persistent storage)
    localStorage.setItem("token", token);
    // save user to local storage 
    localStorage.setItem("user", JSON.stringify(user))

    // 2. Save to global state (React memory)
    setToken(token);
    setUser(user);

    console.log("LOGIN SUCCESS:", user);

    // 3. Redirect user after login to dashboard
    navigate("/dashboard");

  } catch (error) {
    console.log(error.response?.data || error.message);
  }

  };
return (
  <div className="min-h-screen bg-white flex items-center justify-center px-6">

    <div className="w-full max-w-md">

      {/* Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Welcome back
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Login to your Service Marketplace account
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">

        {/* Email */}
        <div>
          <label className="text-xs text-gray-600">
            Email address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 text-sm px-3 py-2 
              bg-white border-b border-gray-300 
              focus:border-black outline-none transition"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-xs text-gray-600">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 text-sm px-3 py-2 
              bg-white border-b border-gray-300 
              focus:border-black outline-none transition"
          />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-xs text-gray-500 hover:text-black transition"
          >
            Forgot password?
          </Link>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-2 py-2 text-sm font-medium 
            bg-black text-white hover:bg-gray-900 
            transition"
        >
          Login
        </button>
      </form>

      {/* Register link */}
      <p className="text-xs text-gray-500 mt-6 text-center">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-black font-medium hover:underline"
        >
          Create account
        </Link>
      </p>

    </div>
  </div>
);
}