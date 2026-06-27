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
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back
        </h1>

        <p className="text-gray-500 mt-2">
          Login to your Service Marketplace account
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Login
        </button>

      </form>

      {/* Register Link */}
      <p className="text-center text-gray-600 mt-6">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-semibold hover:underline"
        >
          Register
        </Link>
      </p>

    </div>
  </div>
);
}