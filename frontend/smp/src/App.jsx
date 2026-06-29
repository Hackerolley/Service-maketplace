import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Services from "./pages/client/Services";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/services" element={<Services/>} />
    </Routes>
  );
}

export default App;