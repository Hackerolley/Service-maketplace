import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/users/register", {
                name,
                email,
                phone,
                password,
            });

            alert("User created successfully");
            console.log("account created successfully")

            // after register → go to Dashboard
            navigate("/dashboard");

        } catch (err) {
            console.log(err.response?.data || err.message);
            alert("Registration failed");
        }
    };

    return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Create Account
        </h2>

        <p className="text-gray-500 mt-2">
          Join our Service Marketplace today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Create Account
        </button>

      </form>

      {/* Login Link */}
      <p className="text-center text-gray-600 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>

    </div>
  </div>
);
};

export default Register;