import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
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
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}