import { useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {  toast } from "sonner";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setToken, setUser } = useAuthStore(); // Get Zustand functions

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${apiBaseUrl}/login`, {
        email,
        password,
      });

      const { token, user } = response.data; // Assuming API returns { token, user }

      setToken(token);
      setUser(user);

      // Success toast with dynamic position
      toast.success("Login Successful", {
        description: `Welcome back, ${user.name}!`,
        style: { 
          backgroundColor: "#4CAF50", // Rich green
          color: "white" 
        }, 
        position: "bottom-right",
      });
      

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");

      // Error toast with dynamic position
      toast.error("Login Failed", {
        description: "Please check your email and password.",
        style: { 
          backgroundColor: "#F44336", // Rich red
          color: "white"
        },
        position: "top-left",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded mt-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

    </div>
  );
};

export default LoginForm;
