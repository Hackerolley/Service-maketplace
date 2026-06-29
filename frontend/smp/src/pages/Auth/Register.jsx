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
  <div className="min-h-screen bg-white flex items-center justify-center px-6">

    <div className="w-full max-w-md">

      {/* Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Create account
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Join our Service Marketplace today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Full Name */}
        <div>
          <label className="text-xs text-gray-600">
            Full name
          </label>

          <input
            type="text"
            placeholder="Enter your full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-2 text-sm px-3 py-2 
              bg-white border-b border-gray-300 
              focus:border-black outline-none transition"
          />
        </div>

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

        {/* Phone */}
        <div>
          <label className="text-xs text-gray-600">
            Phone number
          </label>

          <input
            type="tel"
            placeholder="+234..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 text-sm px-3 py-2 
              bg-white border-b border-gray-300 
              focus:border-black outline-none transition"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-2 py-2 text-sm font-medium 
            bg-black text-white hover:bg-gray-900 
            transition"
        >
          Create account
        </button>
      </form>

      {/* Login link */}
      <p className="text-xs text-gray-500 mt-6 text-center">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-black font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>

    </div>
  </div>
);
};

export default Register;